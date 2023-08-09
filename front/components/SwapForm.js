import swapArrowBlack from "../assets/images/swapArrow.svg";
import swapArrowWhite from "../assets/images/swap-arrow.svg";
import bnbLogo from "../assets/images/bnb-logo.svg";
import metamask from "../assets/images/metamask.png";
import walletPic from "../assets/images/wallet-pic.png";
import walletPicMob from "../assets/images/wallet-pic-mob.png";
import arrowDown from "../assets/images/arrow-narrow-down.svg";
import wallet from "../assets/images/wallet.svg";
import lightningBlue from "../assets/images/lightning-blue.svg";
import gas from "../assets/images/gas-black.svg";
import alert_circle from "../assets/images/alert-circle.svg";
import Link from "next/link";
import Image from "next/image";

import {Component} from 'react'
import React from 'react';


import tokenShopAddress from '../contracts/TokenShop-contract-address.json'
import tokenShopArtifact from '../contracts/TokenShop.json'
import {ConnectWallet} from "@/components/ConnectWallet";
import {CoinsAmount} from "@/components/CoinsAmount";

import {ethers, utils} from "ethers";
import http from "http";
import {Withdrawal} from "@/components/Withdrawal";
import {ChangeOwner} from "@/components/ChangeOwner";
import {WaitingForTransactionMessage} from "@/components/WaitingForTransactionMessage";
import {TransactionErrorMessage} from "@/components/TransactionErrorMessage";
import {Step} from "@/components/Step";
import {SwapFormButton} from "./SwapFormButton";

const FIXED_VALUE = 7

const FIRSTLY_CONNECTION = 'firstly_connection'
export const HARDHAT_NETWORK_ID = '31337'
export const BSC_NETWORK_ID = '97'
export const NETWORK_ID = HARDHAT_NETWORK_ID

const ERROR_CODE_TX_REJECTED_BY_USER = 4001

let step


export class SwapForm extends Component {
    constructor(props) {
        super(props)

        step = props.step

        this.fsetBalance = props.setBalance
        this.fMultiplier = props.setMultiplier
        this.fsetTransactionComplete = props.setTransactionComplete
        this.fsetCurrentAddress = props.setCurrentAddress
        this.fsetIsUserUseMultiplayer = props.setIsUserUseMultiplayer
        this.fsetGlobalMultiplayer = props.setGlobalMultiplayer
        this.fsetSelectAccount = props.setSelectAccount

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
                totalTokens: 0,
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
        if (window?.ethereum?.isConnected()) {
            if (localStorage.getItem(FIRSTLY_CONNECTION)) {
                await this._connectWallet()
            }
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

        if (this.props.step === 4 && prevProps.step !== 4) {
            this.handleAmount(400)
        }

    }


    buy = async () => {
        if (this.props.active) {
            console.log('buyTokensBonus')
            await this.buyTokensBonus()
        } else {
            console.log('buyTokens')
            await this.buyTokens()
        }
        this._clear()
    }

    buyTokensBonus = async () => {
        const balance = ethers.utils.formatUnits(this.state.countTokensCurrent, 0)
        const inWei = this.transTo(balance * this.state.multiplier / this.state.rate) / 10
        // console.log(balance, inwei)
        try {
            const overrides = {
                value: inWei.toString()
            };
            const tx = await this._tokenShop.buyTokensBonus(overrides)
            this.setState({
                txBeingSent: tx.hash
            })
            await tx.wait()
            this.fsetTransactionComplete(true)
        } catch (e) {
            console.error(e);
            this.checkError(e.message)
        } finally {
            this.setState({
                txBeingSent: null
            })
        }
        await this.updateBalance()

    }

    buyTokens = async () => {
        // const signer = this._provider.getSigner(0)
        try {
            const amountToken = this.state.inputValue
            const overrides = {
                value: this.state.priceInWei.toString()
            };

            const tx = await this._tokenShop.buyTokens(amountToken, overrides)
            this.setState({
                txBeingSent: tx.hash
            })
            await tx.wait()
            this.fsetTransactionComplete(true)
        } catch (e) {
            console.error(e);
            if (e.code === ERROR_CODE_TX_REJECTED_BY_USER) {
                console.log('user cancel' + ERROR_CODE_TX_REJECTED_BY_USER)
            }
            // this.setState({
            //   transactionError: e
            // })

            this.checkError(e.message)
        } finally {
            this.setState({
                txBeingSent: null
            })
        }
        await this.updateBalance()
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

    showError = (error) => {
        this.setState({
            currentError: error
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
            _balanceContractBonuses: _balanceContractBonuses,
            totalTokens: tokens *1 + balanceOfBonuses*1,

        })
        console.log(this.state)
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
        this.fsetSelectAccount(selectedAddress)
        this.setState({
            selectAccount: selectedAddress,
        }, async () => {
            await this.updateBalance()
            if (this.props.active) {
                await this.handleInput(this.state.countTokensCurrent * this.state.multiplier)
            }
        })


    }

    handleInput = async (value) => {
        const regex = /^(?=.*\d)\d{0,6}$/
        if (value === '' || regex.test(value)) {
            this.setState({inputValue: value * 1});
            await this.getRate()
        }
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

        // this.setState({
        //     networkError: "Please connect to another Network"
        // })
        // this.showError('Please connect to another Network')
        // return false
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

        await this._initialize(selectedAddress)

        window.ethereum.on('accountsChanged', async ([newAddress]) => {
            this._resetState()
            await this._initialize(newAddress)
        })

        window.ethereum.on('chainChanged', async ([networkId]) => {
            return this._resetState()
        })

        localStorage.setItem(FIRSTLY_CONNECTION, true)
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
            this._addTokenToMetaMask().then(() => {
                setTimeout(this._connectWallet, 500);
            })
        });
    };

    _setNetworkError = (error) => {
        this.setState({
            networkError: error,
            currentError: error
        })

        console.log('networkError', this.state.networkError)
    }

    changeInputs = () => {
        if (this.state.inputs) {
            this.setState({inputs: false})
        } else {
            this.setState({inputs: true})
        }
    }

    handleAmount = (selectedAmount) => {
        const {data} = this.props
        this.setState({value: `$ ${selectedAmount}`})
        const {amount} = data.filter(el => el.amount === selectedAmount)[0]
        this.setState({activeAmount: amount})
        this.setState({inputValue: amount});
        this.getRate().then()
    }


    render() {
        const {active, data, modalVisible} = this.props

        return (
            <>
                <div
                    className={"bg-textColor flex-col justify-between relative md:top-0 top-[-280px] " +
                        "max-w-[497px] " +
                        "min-h-[670px] sx:h-[auto] shadow-[19px_23px_87px_0_#6CB8EF33] " +
                        "md:rounded-tl-2xl md:rounded-tr-2xl md:rounded-bl-none md:rounded-br-none rounded-md sx:rounded-tr-none sx:rounded-tl-none w-full md:mt-0 mt-[22px] sx:px-4 pb-[27px] sx:pb-[40px] md:mb-[-118px] "
                        + (active ? "sx:h-[655px]" : "sx:h-[543px]")

                    }
                >


                    <div
                        className="bg-primaryBgColor flex justify-between items-end w-full sm:rounded-t-[10px] pt-5 mb-[27px] sm:px-4 px-7 sx:mx-auto sx:max-w-[343px]">
                        <div className="flex flex-col gap-10 pb-5">
                            <div className="flex flex-col">
                                <p className="text-buttonBgColor text-sm leading-4 mb-2">Your BNXT balance</p>
                                <div className="flex">
                                    <Image src={swapArrowBlack} alt={swapArrowBlack}
                                           className="w-[34px] h-[34px] mr-3"/>
                                    <span
                                        className="text-textColor sm:text-[32px] text-4xl font-semibold sm:leading-[34.82px] leading-10">
										{this.state.countTokensCurrent ? ethers.utils.formatUnits(this.state.countTokensCurrent, 0) : 0}
                                    </span>

                                </div>
                                {this.state._balanceOfBonuses > 0 &&
                                    <p className='text-amber-300'>
                                        ({ethers.utils.formatUnits(this.state._balanceOfBonuses, 0)})
                                    </p>
                                }
                            </div>
                            <div className="flex flex-col">
                                <p className="text-buttonBgColor text-sm leading-4 mb-2">Your BNB balance</p>
                                <div className="flex">
                                    <Image src={bnbLogo} className="w-[34px] h-[34px] mr-3" alt={bnbLogo}/>
                                    <span
                                        className="text-textColor sm:text-[32px] text-4xl font-semibold sm:leading-[34.82px] leading-10">
                                        {
                                            this.state.balance ? parseFloat(ethers.utils.formatEther(this.state.balance)).toFixed(3) : 0
                                        }
                                        </span>
                                </div>
                            </div>
                        </div>

                        <Image src={walletPic} className="w-[211px] h-[185px] sm:hidden relative left-3"
                               alt={walletPic}/>
                        <Image src={walletPicMob} className="w-[101px] h-[185px] sm:block hidden relative left-3"
                               alt={walletPicMob}/>

                    </div>

                    <div
                        className={"flex flex-col items-center relative bg-textBgColor w-full max-w-[497px] sx:px-0 px-7 pt-[26px] rounded-md h-full sx:mx-auto "}>

                        {
                            this.state.selectAccount &&
                            <>

                                <div
                                    className="bg-gradient-to-r from-[#34C4E1] via-[#5B86F8] to-[#7165ED] w-full rounded-[49px] p-[1px] mb-[26px] ">
                                    <div
                                        className="bg-white p-2 flex justify-center gap-3 items-center rounded-[49px]  ">
                                        <Image src={lightningBlue} className="" alt={lightningBlue}/>
                                        <p className="text-primaryBgColor text-base leading-[17.41px] font-medium">1
                                            bNXT <span
                                                className="text-primaryBgColor text-base leading-[17.41px] font-light">($1.00)</span> = {parseFloat(1 / (this.state.rate * 1)).toFixed(5)} BNB
                                        </p>
                                    </div>
                                </div>


                                {
                                    this.props.active ?

                                        <>
                                            {
                                                this.state.isUsedMultiplier ?
                                                    <>
                                                        <div
                                                            className="flex flex-col justify-content items-center gap-4 px-[70px] mt-[125px] mb-[118px]">
                                                            <p className="text-3xl font-medium leading-[32.64px] text-center max-w-[438px] w-full">You
                                                                have already used the reward</p>
                                                            <p className="text-base font-normal leading-[26px] text-center max-w-[320px] w-full">Amet
                                                                minim mollit non deserunt ullamco est sit aliqua dolor
                                                                do amet sint.</p>
                                                        </div>

                                                    </> :
                                                    <>
                        		      					<span className={"sm:text-sm text-base font-semibold leading-[17.41px] sx:mr-[70px] sm:mr-[120px] mr-[140px] "}>
                           			   						 Buy BNXT with multiplier x{this.state.multiplier}
                           			 					</span>

                                                        <div
                                                            className="flex justify-between items-center bg-[#F2F2F2] max-w-[440px] w-full rounded-[6px] pr-6 pl-4 py-[10px]">
                                                            <input
                                                                readOnly={active || modalVisible}
                                                                value={this.state.countTokensCurrent * 10}
                                                                name="number"
                                                                className="appearance-none bg-[#F2F2F2] text-primaryBgColor md:text-3xl text-[34px] sx:text-[24px] leading-[37] outline-0 w-full h-[44px]"
                                                            />

                                                            <span className="text-primaryBgColor">$
                                                                {
                                                                    this.state.countTokensCurrent * 1
                                                                }
                                       						 </span>

                                                        </div>
                                                        <p>${this.state.value}</p>
                                                        <div
                                                            className="bg-textColor relative flex justify-between items-center w-full rounded-md mb-5 mt-[26px]"
                                                        >
                                                            <div
                                                                className="flex justify-between items-center border-b-[1px] border-[#F2F2F2] pb-5">
                                                                <Image src={swapArrowWhite} alt={swapArrowWhite}
                                                                       className="w-[30px] h-[30px] mr-[6px]"/>
                                                                <span
                                                                    className="bg-textColor text-primaryBgColor sm:text-sm text-lg font-medium leading-5 mr-2"
                                                                >{this.state.countTokensCurrent * 1} BNXT (${this.state.countTokensCurrent * 1}) = </span>
                                                                <Image src={bnbLogo}
                                                                       className="w-[30px] h-[30px] mr-[6px]"
                                                                       alt={bnbLogo}/>
                                                                <span
                                                                    className="bg-textColor text-primaryBgColor sm:text-sm text-lg font-medium leading-5">
                                                            {(this.state.priceInBnb / 10).toFixed(FIXED_VALUE)} BNB
                                                					</span>
                                                            </div>
                                                        </div>

                                                        <div className="w-full">
                                                            <div className="w-full mb-[53px]">
                                                                <div
                                                                    className="flex justify-between items-center text-[#EB5757] mb-[10px]">
                                                                    <p className="sm:text-sm text-base font-normal leading-[17.41px]">Discount</p>
                                                                    <span
                                                                        className="sm:text-sm text-base font-normal leading-[17.41px]">90% ( - ${this.state.countTokensCurrent * this.state.multiplier - this.state.countTokensCurrent * this.state.multiplier / 10})</span>
                                                                </div>

                                                                <div
                                                                    className="flex justify-between items-center text-primaryBgColor mb-[10px]">
                                                                    <p className="sm:text-sm text-base font-normal leading-[17.41px]">Network
                                                                        fee</p>
                                                                    <div className="flex justify-between items-center gap-[8px]">
                                                                        <Image src={gas} alt={''}/>
                                                                        {
                                                                            this.state.gasPrice &&
                                                                            <span
                                                                                className="text-base font-normal leading-[17.41px]">{this.state.gasPrice} Gwei</span>
                                                                        }
                                                                    </div>
                                                                </div>

                                                                <div
                                                                    className="flex justify-between items-center text-primaryBgColor ">
                                                                    <p className="sm:text-sm text-base font-normal leading-[17.41px]">Total
                                                                        Cost</p>
                                                                    {
                                                                        this.state.totalCostUSD && this.props.active
                                                                            ?
                                                                            <span
                                                                                className="sm:text-sm text-base font-normal leading-[17.41px]"> ~ $ {(this.state.totalCostUSD * this.state.rate / 10).toFixed(FIXED_VALUE)}</span>
                                                                            :
                                                                            <span
                                                                                className="sm:text-sm text-base font-normal leading-[17.41px]"> ~ $ {(this.state.totalCostUSD * this.state.rate).toFixed(FIXED_VALUE)}</span>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <SwapFormButton
                                                            buy={this.buy}
                                                            currentError={this.state.currentError}
                                                            _changeAddNetwork={this.changeAddNetwork}
                                                            _class={"rounded-md w-full h-[60px] py-[17px] font-medium sm:text-sm text-lg transform-gpu transition-transform duration-200 ease-in-out hover:scale-95 focus:scale-95 active:scale-95 relative "
                                                                + (this.state.currentError && this.state.currentError === 'Please connect to another Network' ? "bg-errorColor text-textColor z-10" : "bg-gradient-to-r from-[#29C8A9] via-[#208ED0] to-[#703AAD] text-primaryBgColor")
                                                            }
                                                        />
                                                    </>
                                            }
                                        </>

                                        :
                                        <>
                                            { this.state.totalTokens}
                                            {
                                                this.state.totalTokens <= 1000
                                                    ?
                                                    <>
                                                     <span
                                                         className={"sm:text-sm text-base font-semibold leading-[17.41px] sx:mr-[70px] sm:mr-[120px] mr-[140px] "}>
                            	   						 	Set up how many BNXT you want to buy
                                           				 </span>
                                                        <div
                                                            className="flex flex-col justify-between items-center max-w-[440px] gap-[10px] text-center mx-auto">
                                                            <div
                                                                className={"flex justify-between items-center w-full gap-[9px] "}>
                                                                {data.slice(0, 5).map(el => (
                                                                    <CoinsAmount key={el.amount} amount={el.amount}
                                                                                 step={false}
                                                                                 activeAmount={this.state.activeAmount}
                                                                                 handleAmount={this.handleAmount}/>
                                                                ))}
                                                            </div>
                                                            <div
                                                                className="flex justify-between items-center gap-[9px]">
                                                                {data.slice(-5).map(el => (
                                                                    <CoinsAmount key={el.amount} amount={el.amount}
                                                                                 step={false}
                                                                                 activeAmount={this.state.activeAmount}
                                                                                 handleAmount={this.handleAmount}/>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <>
                                                            <p>{this.state.value}</p>
                                                            <div
                                                                className="bg-textColor relative flex justify-between items-center w-full rounded-md mb-5 mt-[26px]"
                                                            >
                                                                <div
                                                                    className="flex justify-between items-center border-b-[1px] border-[#F2F2F2] pb-5">
                                                                    <Image src={swapArrowWhite} alt={swapArrowWhite}
                                                                           className="w-[30px] h-[30px] mr-[6px]"/>
                                                                    <span
                                                                        className="bg-textColor text-primaryBgColor sm:text-sm text-lg font-medium leading-5 mr-2"
                                                                    >{this.state.countTokensCurrent * 10} BNXT (${this.state.countTokensCurrent * 1}) = </span>
                                                                    <Image src={bnbLogo} className="w-[30px] h-[30px] mr-[6px]"
                                                                           alt={bnbLogo}/>
                                                                    <span
                                                                        className="bg-textColor text-primaryBgColor sm:text-sm text-lg font-medium leading-5">
                                                            {
                                                                (this.state.priceInBnb * 1).toFixed(FIXED_VALUE)
                                                            }
                                                                        BNB
                                              						  </span>

                                                                </div>

                                                            </div>
                                                        </>


                                                        <div className="w-full">
                                                            <div className="w-full mb-[53px]">
                                                                <div
                                                                    className="flex justify-between items-center text-primaryBgColor mb-[10px]">
                                                                    <p className="sm:text-sm text-base font-normal leading-[17.41px]">Network
                                                                        fee</p>
                                                                    <div className="flex justify-between items-center gap-[8px]">
                                                                        <Image src={gas} alt={''}/>
                                                                        {
                                                                            this.state.gasPrice &&
                                                                            <span
                                                                                className="text-base font-normal leading-[17.41px]">{this.state.gasPrice} Gwei</span>
                                                                        }
                                                                    </div>
                                                                </div>

                                                                <div
                                                                    className="flex justify-between items-center text-primaryBgColor ">
                                                                    <p className="sm:text-sm text-base font-normal leading-[17.41px]">Total
                                                                        Cost</p>
                                                                    {
                                                                        this.state.totalCostUSD && this.props.active
                                                                            ?
                                                                            <span
                                                                                className="sm:text-sm text-base font-normal leading-[17.41px]"> ~ $ {(this.state.totalCostUSD * this.state.rate / 10).toFixed(FIXED_VALUE)}</span>
                                                                            :
                                                                            <span
                                                                                className="sm:text-sm text-base font-normal leading-[17.41px]"> ~ $ {(this.state.totalCostUSD * this.state.rate).toFixed(FIXED_VALUE)}</span>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <SwapFormButton
                                                            buy={this.buy}
                                                            currentError={this.state.currentError}
                                                            _changeAddNetwork={this.changeAddNetwork}
                                                            _class={"rounded-md w-full h-[60px] py-[17px] font-medium sm:text-sm text-lg transform-gpu transition-transform duration-200 ease-in-out hover:scale-95 focus:scale-95 active:scale-95 relative "
                                                                + (this.state.currentError && this.state.currentError === 'Please connect to another Network' ? "bg-errorColor text-textColor z-10" : "bg-gradient-to-r from-[#29C8A9] via-[#208ED0] to-[#703AAD] text-primaryBgColor")
                                                            }
                                                        />


                                                    </>

                                                    :
                                                    <>
                                                        <div className="flex flex-col justify-content items-center gap-4 px-[88px] mt-[125px] mb-[118px]">
                                                            <p className="text-3xl font-medium leading-[32.64px]">Please note!</p>
                                                            <p className="text-base font-normal leading-[26px] text-center max-w-[320px] w-full">Your current balance is 1000 BNXT.
                                                                You can no longer buy currency.
                                                                Please get your reward!</p>
                                                        </div>

                                                    </>

                                            }
                                        </>
                                }




                                {/*<div className="px-7">*/}
                                {/*    {*/}
                                {/*        !this.state.selectAccount && !this.state.currentError*/}
                                {/*            ?*/}
                                {/*            <ConnectWallet*/}
                                {/*                connectWallet={this._connectWallet}*/}
                                {/*                setNetworkError={this._setNetworkError}*/}
                                {/*                _class={"bg-gradient-to-r from-[#29C8A9] via-[#208ED0] to-[#703AAD] text-textColor rounded-md w-full h-[60px] py-[17px] font-medium text-[18px] transform-gpu transition-transform duration-200 ease-in-out hover:scale-95 focus:scale-95 active:scale-95 shadow-[0_12px_18px_0_#40A6DF5C] relative "}*/}
                                {/*            />*/}
                                {/*            :*/}

                                {/*    }*/}
                                {/*</div>*/}

                            </>
                        }


                        {/*notification*/}

                        {
                            !this.state.selectAccount && !this.state.currentError &&
                            <>

                                <div
                                    className="flex flex-col justify-between items-center gap-4 max-w-[320px] mt-[83px] mb-[89px]">
                                    <Image src={metamask} className="w-[88px] h-[88px]" alt={metamask}/>
                                    <p className="text-3xl font-medium leading-[32.64px] mt-10">Connect your wallet</p>
                                    <p className="text-base font-normal leading-[26px] text-center">Amet minim mollit
                                        non
                                        deserunt ullamco est sit aliqua dolor do amet sint.</p>
                                </div>
                                <ConnectWallet
                                    connectWallet={this._connectWallet}
                                    setNetworkError={this._setNetworkError}
                                    _class={"bg-gradient-to-r from-[#29C8A9] via-[#208ED0] to-[#703AAD] text-textColor rounded-md w-full h-[60px] py-[17px] font-medium text-[18px] transform-gpu transition-transform duration-200 ease-in-out hover:scale-95 focus:scale-95 active:scale-95 shadow-[0_12px_18px_0_#40A6DF5C] relative "}
                                />
                            </>

                        }


                        {
                            !this.state.selectAccount && this.state.currentError === 'Please connect to another Network' &&
                            <>
                                <div
                                    className="flex flex-col justify-between items-center gap-4 max-w-[320px] mt-[70px] mb-[72px]">
                                    <Image src={bnbLogo} className="w-[88px] h-[88px]" alt={bnbLogo}/>
                                    <p className="text-3xl font-medium leading-[32.64px]">Switch network</p>
                                    <p className="text-base font-normal leading-[26px]">Amet minim mollit non deserunt
                                        ullamco est sit aliqua dolor do amet sint.</p>
                                </div>
                                <SwapFormButton
                                    step={step}
                                    buy={this.buy}
                                    currentError={this.state.currentError}
                                    _changeAddNetwork={this.changeAddNetwork}
                                    _class={"rounded-md w-full h-[60px] py-[17px] bg-red-600 font-medium sm:text-sm text-lg transform-gpu transition-transform duration-200 ease-in-out hover:scale-95 focus:scale-95 active:scale-95 relative "
                                        + (this.state.currentError && this.state.currentError === 'Please connect to another Network' || step === 2 ? "bg-errorColor text-textColor z-10" : "bg-gradient-to-r from-[#29C8A9] via-[#208ED0] to-[#703AAD] text-primaryBgColor"
                                        )
                                    }
                                />
                            </>

                        }


                    </div>
                </div>
            </>
        )
    }
}