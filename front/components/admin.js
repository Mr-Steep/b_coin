import {Component} from 'react'
import React from 'react';


import tokenShopAddress from '../contracts/TokenShop-contract-address.json'
import tokenShopArtifact from '../contracts/TokenShop.json'


import {ethers, utils} from "ethers";
import http from "http";
import {Withdrawal} from "@/components/Withdrawal";
import {ChangeOwner} from "@/components/ChangeOwner";
import {WaitingForTransactionMessage} from "@/components/WaitingForTransactionMessage";
import {TransactionErrorMessage} from "@/components/TransactionErrorMessage";
import {Step} from "@/components/Step";
import {SwapFormButton} from "./SwapFormButton";

const FIXED_VALUE = 7
export const HARDHAT_NETWORK_ID = '31337'
export const BSC_NETWORK_ID = '97'
export const NETWORK_ID = HARDHAT_NETWORK_ID

const ERROR_CODE_TX_REJECTED_BY_USER = 4001



export class Admin extends Component {
    constructor(props) {
        super(props)

        this.fsetBalance = props.setBalance
        this.fMultiplier = props.setMultiplier
        this.fsetTransactionComplete = props.setTransactionComplete
        this.fsetCurrentAddress = props.setCurrentAddress
        this.fsetIsUserUseMultiplayer = props.setIsUserUseMultiplayer
        this.fsetGlobalMultiplayer = props.setGlobalMultiplayer

        this.initialState =
            {
                selectAccount: null,
                txBeingSent: null,
                networkError: null,
                transactionError: null,
                balance: null,
                countBNB: null,
                rate: 0,
                gasPrice: 0,
                totalCostUSD: 0,
                priceInBnb: 0,
                priceInWei: 0,
                inputValue: 0,
                newAddressOwner: '',
                multiplier: 0,
                isModalOpen: false,
                inputs: true,
                isUsedMultiplier: false,
                globalMultiplier: 0,
                currentError: false,
                _balanceOfBonuses: 0,
                _balanceContractBonuses: 0,
                _timeUnlockTime: "",
                value: "",
                activeAmount: ""
            }

        this.state = this.initialState
    }

    componentDidMount = async (props) => {
        if (window?.ethereum?.isConnected()){
            await this._connectWallet()
        }

    }

    componentDidUpdate = async (prevProps) => {
        if (prevProps.active !== this.props.active) {
            if (this.props.active) {
                const tokens = ethers.utils.formatUnits(this.state.countTokensCurrent, 0)
                const bonusTokens = tokens * this.state.multiplier
                this.setState({
                    inputValue: bonusTokens
                })
                await this.getRate()
            } else {
                this._clear()
            }

        }

        if(this.props.step === 4 && prevProps.step !== 4) {
            this.handleAmount(400)
        }

    }


    withdrawal = async () => {
        try {
            const tx = await this._tokenShop.withdrawal()
            this.setState({
                txBeingSent: tx.hash
            })
            await tx.wait()
        } catch (e) {
            this.checkError(e.message)
            console.error(e);

        } finally {
            this.setState({
                txBeingSent: null
            })
        }
    }


    _setGlobalMultiplier = async () => {
        try {
            const multiplayer = this.state.globalMultiplier
            const tx = await this._tokenShop.setGlobalMultiplier(multiplayer)
            this.setState({
                txBeingSent: tx.hash
            })
            await tx.wait()
        } catch (e) {
            this.checkError(e.message)
            console.error(e);

        } finally {
            this.setState({
                txBeingSent: null
            })
        }
    }


    unlockTokens = async () => {
        try {
            const tx = await this._tokenShop.unlockTokens()
            this.setState({
                txBeingSent: tx.hash
            })
            await tx.wait()
        } catch (e) {
            this.checkError(e.message)
            console.error(e);
        } finally {
            this._resetState()
        }
    }
    _setUnlockTime = async () => {
        try {
            const timestamp = this.state._timeUnlockTime
            const tx = await this._tokenShop._setUnlockTime(timestamp)
            this.setState({
                txBeingSent: tx.hash
            })
            await tx.wait()
        } catch (e) {
            this.checkError(e.message)
            console.error(e);
        } finally {
            this._resetState()
        }
    }

    showError = (error)=> {
        this.setState({
            currentError:error
        })
    }

    changeOwner = async () => {
        const address = this.state.newAddressOwner
        if (!utils.isAddress(address)) {
            return this.showError('Invalid address');
        }
        try {
            const tx = await this._tokenShop.transferOwnership(address)
            this.setState({
                txBeingSent: tx.hash
            })
            await tx.wait()
        } catch (e) {
            this.checkError(e.message)
            console.error(e);

        } finally {
            this.setState({
                txBeingSent: null
            })
        }
    }

    async updateBalance() {
        await this.getRate()
        const newBalance = (await this._provider.getBalance(this.state.selectAccount))?.toString()
        const countTokens = (await this._tokenShop.tokenBalanceContract())
        const countBNB = await this._tokenShop.provider.getBalance(this._tokenShop.address)
        const multiplier = await this._tokenShop.getMultiplier()
        const countTokensCurrent = await this._tokenShop.tokenBalanceCurrent()
        const isUsedMultiplier = await this._tokenShop.getIsUsed()
        const globalMultiplier = await this._tokenShop.getGlobalMultiplier()
        const _balanceOfBonuses = await this._tokenShop.tokenBalanceCurrentBonuses()
        const _balanceContractBonuses = await this._tokenShop.tokenBonusBalanceContract()

        const multiplierInt = ethers.utils.formatUnits(multiplier, 0)
        const tokens = ethers.utils.formatUnits(countTokensCurrent, 0);
        const balanceOfBonuses = ethers.utils.formatUnits(_balanceOfBonuses, 0);

        this.setState({
            balance: newBalance,
            countTokens: countTokens,
            countTokensCurrent: countTokensCurrent,
            countBNB: countBNB,
            multiplier: multiplierInt,
            isUsedMultiplier: isUsedMultiplier,
            globalMultiplier: globalMultiplier,
            _balanceOfBonuses: balanceOfBonuses,
            _balanceContractBonuses: _balanceContractBonuses
        })

        this.fsetBalance(tokens)
        this.fMultiplier(multiplierInt)
        this.fsetIsUserUseMultiplayer(isUsedMultiplier)
        this.fsetGlobalMultiplayer(globalMultiplier)

    }

    getRate = async (isBNB = false) => {
        await this.getGasPrice()
        const url = 'https://api.binance.com/api/v3/ticker/price?symbol=BNBBUSD'
        http.get(url, res => {
            let data = "";
            res.on("data", chunk => {
                data += chunk;
            })
            res.on("end", () => {
                const dataParse = JSON.parse(data);
                const price = dataParse.price
                let priceInWei
                let priceInBnb
                if (isBNB) {
                    if (!this.state.priceInBnb) {
                        return
                    }
                    priceInWei = this.transTo(parseFloat(this.state.priceInBnb))
                    priceInBnb = this.state.priceInBnb
                } else {
                    if (!this.state.inputValue) {
                        return
                    }
                    priceInWei = this.transTo(this.state.inputValue / price)
                    priceInBnb = (this.state.inputValue / price).toFixed(7)
                }
                const gwei = (this.state.gasPrice).toString()

                const weiGas = ethers.utils.parseUnits(gwei, "gwei");
                const weiValue = ethers.utils.parseUnits(priceInWei, "wei");
                const totalInWei = ethers.utils.formatUnits(weiGas.add(weiValue), "ether")


                this.setState({
                    rate: price,
                    priceInWei: priceInWei,
                    priceInBnb: priceInBnb,
                    inputValue: (price * priceInBnb).toFixed(0),
                    totalCostUSD: totalInWei
                });
                this.showError('')
            });
        })
    }

    getGasPrice = async () => {
        if (this.state.gasPrice === 0) {
            const url = 'https://api.bscscan.com/api?module=gastracker&action=gasoracle'
            http.get(url, res => {
                let data = "";
                res.on("data", chunk => {
                    data += chunk;
                })
                res.on("end", () => {
                    const dataParse = JSON.parse(data);
                    if (dataParse.message === "NOTOK") {
                        return setTimeout(async () => {
                            await this.getGasPrice()
                        }, 1000)
                    }
                    const gasPrice = dataParse.result.SafeGasPrice
                    return this.setState({
                        gasPrice: gasPrice
                    });
                });
            })
        }

    }

    transTo = function (riceInWei) {
        const strRiceInWei = (parseFloat(riceInWei)).toFixed(18).toString()
        const wei = ethers.utils.parseEther(strRiceInWei);
        return wei.toString()
    }

    async _initialize(selectedAddress) {
        this.fsetCurrentAddress(selectedAddress)
        this._provider = new ethers.providers.Web3Provider(window.ethereum)
        this._tokenShop = new ethers.Contract(
            tokenShopAddress.TokenShop,
            tokenShopArtifact.abi,
            this._provider.getSigner(0)
        )

        this.setState({
            selectAccount: selectedAddress,
        }, async () => await this.updateBalance())
    }


    _clear() {
        this.setState({
            inputValue: 0,
            priceInBnb: 0,
            totalCostUSD: 0,
            priceInWei: 0,
        })
    }

    _resetState() {
        this.setState(this.initialState)
    }

    _checkNetwork() {
        if (window.ethereum.networkVersion === HARDHAT_NETWORK_ID) {
            return true
        }
    }


    _dismissNetworkError = () => {
        this.setState({
            networkError: null
        })
    }

    _connectWallet = async () => {
        if (window.ethereum === undefined) {
            this.setState({
                networkError: "Please install Metamask"
            })
            this.showError("Please install Metamask")
            return
        }

        const [selectedAddress] = await window.ethereum.request({
            method: 'eth_requestAccounts'
        })

        if (!this._checkNetwork()) {
            return
        }
        console.log('selectedAddress ', selectedAddress)
        await this._initialize(selectedAddress)

        window.ethereum.on('accountsChanged', async ([newAddress]) => {
            this._resetState()
            await this._initialize(newAddress)
        })

        window.ethereum.on('chainChanged', async ([networkId]) => {
            return this._resetState()
        })
    }

    checkError(message) {
        const errors = [
            'Are you trying to buy more',
            'Not an Owner',
            'New owner cannot be zero address',
            'Insufficient funds',
            'Contract has no tokens',
            'The amount of the token must be equal to the balance on the wallet',
            'Token amount below minimum',
            'Token amount above maximum',
            'Token amount must be a multiple of the',
            'Token amount can be maximum 1000',
            'Bonus has been used',
            'Time has not come yet',
        ]
        for (const i in errors) {
            if (message.includes(errors[i])) {
                this.showError(errors[i]);
            }
        }
        return false;
    }
    _fillTimestamp = (value) => {
        this.setState({_timeUnlockTime: value});
    }
    _fillGlobalMultiplier = (value) => {
        this.setState({globalMultiplier: value});
    }

    handleInputAddress = (value) => {
        this.setState({newAddressOwner: value});
    }


    _getRpcErrorMessage(error) {
        if (error.data) {
            error.data.message
        }
        return error.message
    }

    _dismissTransactionError = () => {
        this.setState({
            transactionError: null
        })
    }

    _addTokenToMetaMask = async () => {
        // Check if MetaMask is installed

        if (typeof window.ethereum === 'undefined') {
            console.log('MetaMask is not installed.');
            return;
        }

        // Request the permission to access the MetaMask accounts
        await window.ethereum.request({method: 'eth_requestAccounts'});

        try {
            // Add the token to MetaMask
            await window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address: process.env.NEXT_PUBLIC_PRODUCTION_TOKEN_ADDRESS,
                        symbol: process.env.NEXT_PUBLIC_PRODUCTION_TOKEN_SYMBOL,
                        decimals: process.env.NEXT_PUBLIC_PRODUCTION_TOKEN_DECIMALS,
                    },
                },
            });
            console.log('Token added to MetaMask successfully.');
        } catch (error) {
            console.log('Error adding token to MetaMask:', error);
        }
    }

    _addNetwork = async () => {

        const chainId = process.env.NEXT_PUBLIC_PRODUCTION_NETWORK_CHAIN_ID
        const hexString = Number(chainId).toString(16);
        const _chainId = "0x" + hexString;
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{chainId: _chainId}],
            });
        } catch (switchError) {
            const originallyError = switchError?.data?.originalError?.code
            if (switchError.code === 4902 || originallyError === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: _chainId,
                                chainName: process.env.NEXT_PUBLIC_PRODUCTION_NETWORK_CHAIN_NAME,
                                nativeCurrency: {
                                    name: process.env.NEXT_PUBLIC_PRODUCTION_NETWORK_NATIVE_CURRENCY_NAME,
                                    symbol: process.env.NEXT_PUBLIC_PRODUCTION_NETWORK_NATIVE_CURRENCY_SYMBOL,
                                    decimals: parseInt(process.env.NEXT_PUBLIC_PRODUCTION_NETWORK_NATIVE_CURRENCY_DECIMALS, 10),
                                },
                                rpcUrls: [process.env.NEXT_PUBLIC_PRODUCTION_NETWORK_RPC_URLS]
                            },
                        ],
                    });

                } catch (addError) {
                    console.log(addError)
                }
            }
        } finally {
            this._resetState()
        }
    };

    changeAddNetwork = () => {
        this._addNetwork().then(() => {
            this._addTokenToMetaMask().then(()=>{
                setTimeout(this._connectWallet, 500);
            })
        });
    };

    _setNetworkError = (error) => {
        this.setState({
            networkError: error,
            currentError: error
        })

        console.log( 'networkError', this.state.networkError)
    }

    changeInputs = () => {
        if(this.state.inputs) {
            this.setState({inputs: false})
        } else {
            this.setState({inputs: true})
        }
    }

    handleAmount = (selectedAmount) => {
        const {data} = this.props
        this.setState({value: `$ ${selectedAmount}`})
        const { amount } = data.filter(el => el.amount === selectedAmount)[0]
        this.setState({activeAmount: amount})
        this.setState({inputValue: amount});
        this.getRate().then()
        console.log('state', this.state)
    }


    render() {

        const style_contract = {
            "background": 'red',
            "padding": '1rem',
            "width":'100%',
        }

        return (
            <>
                {/*_________remove_________*/}

                <div style={style_contract}>
                    {
                        this.state.txBeingSent && (
                            <WaitingForTransactionMessage txHash={this.state.txBeingSent}/>
                        )
                    }
                    {
                        this.state.transactionError && (
                            <TransactionErrorMessage
                                message={this._getRpcErrorMessage(this.state.transactionError)}
                                dismiss={this._dismissTransactionError}
                            />
                        )
                    }

                    {
                        this.state.balance &&
                        <>
                            <p>balance Contract Token: {ethers.utils.formatUnits(this.state.countTokens, 0)}</p>
                            <p>balance Contract Bonus
                                Token: {ethers.utils.formatUnits(this.state._balanceContractBonuses, 0)}</p>
                        </>
                    }

                    {
                        this.state.balance &&
                        <>
                            <p>balance Contract
                                USD: {parseFloat(ethers.utils.formatEther(this.state.countBNB) * this.state.rate).toFixed(3)}</p>

                            <p>balance Contract BNB: {ethers.utils.formatEther(this.state.countBNB)}</p>
                            <p> GlobalMultiplier:
                                <input
                                    className={'w-10'}
                                    onChange={(e) => this._fillGlobalMultiplier(e.target.value)}
                                    type="text"/>

                                <button
                                    className="bg-white m-2 py-2 px-4"
                                    onClick={this._setGlobalMultiplier}>setGlobalMultiplier
                                </button>

                            </p>
                            <Withdrawal
                                handleClick={this.withdrawal}
                            />
                            <ChangeOwner
                                handleClick={this.changeOwner}
                                inputValue={this.state.newAddressOwner}
                                handleInput={this.handleInputAddress}
                            />


                            <div className={'border-2'}>
                                <p>setUnlockTime</p>
                                <input
                                    type="text"
                                    onChange={(e) => this._fillTimestamp(e.target.value)}
                                />
                                <button
                                    className="bg-white m-1 py-1 px-2"
                                    onClick={this._setUnlockTime}>setUnlockTime
                                </button>
                                <button
                                    className="bg-white m-2 py-2 px-4"
                                    onClick={this.unlockTokens}>unlockTokens
                                </button>
                            </div>
                        </>
                    }
                </div>

            </>
        )
    }
}