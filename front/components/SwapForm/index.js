import {Component} from 'react'
import React from 'react';


import tokenShopAddress from '../../contracts/TokenShop-contract-address.json'
import tokenShopArtifact from '../../contracts/TokenShop.json'
import {ConnectWallet} from "../ConnectWallet";
import {CoinsAmount} from "../CoinsAmount";
import {ethers} from "ethers";
import {SwapFormButton} from "../SwapFormButton";
import {BNXTtoBNB} from "../BNXTtoBNB";
import {BNXTtoBNBamount} from "../BNXTtoBNBamount";
import {TotalCost} from "../TotalCost";
import {Discount} from "../Discount";
import {SwitchNetworkText} from "../SwitchNetworkText";
import {ConnectWalletText} from "../ConnectWalletText";
import {GetRewardText} from "../GetRewardText";
import {UsedRewardText} from "../UsedRewardText";
import {SwapFormHeader} from "../SwapFormHeader";
import {MultiplierField} from "../MultiplierField";
import {
    _addNetwork,
    _addTokenToMetaMask,
    _checkNetwork,
    _clear,
    _resetState,
    checkError,
    showError,
    transTo
} from "../SwapFormFunctions";


const FIXED_VALUE = 7

const FIRSTLY_CONNECTION = 'firstly_connection'
export const HARDHAT_NETWORK_ID = '31337'
export const BSC_NETWORK_ID = '97'
export const NETWORK_ID = HARDHAT_NETWORK_ID

const ERROR_CODE_TX_REJECTED_BY_USER = 'ACTION_REJECTED'

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
        this.fsetHash = props.setHash

        this.initialState =
            {
                selectAccount: null,
                txBeingSent: null,
                networkError: null,
                balance: null,
                countBNB: null,
                rate: 0,
                gasPrice: 0,
                totalCostUSD: 0,
                priceInBnb: 0,
                priceInWei: 0,
                inputValue: 0,
                multiplier: 0,
                isUsedMultiplier: false,
                globalMultiplier: 0,
                currentError: false,
                _balanceOfBonuses: 0,
                _balanceTokens: 0,
                isLoading: false
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

    buy = async () => {
        this.setState({
            isLoading: true
        })
        try {
            if (this.state.globalMultiplier > 0) {
                await this.buyTokens()
            } else {
                if (this.props.active) {
                    await this.buyTokensBonus()
                } else {
                    await this.buyTokens()
                }
            }
            this.setState({
                isLoading: false
            })
        } catch (error) {
            console.error('Error fetching data:', error);
            this.setState({
                isLoading: false
            })
        }
    }

    buyTokensBonus = async () => {
        const inWei = this.state.priceInWei
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
            this.fsetHash(tx.hash)
            _clear(this.state)
        } catch (e) {
            if (e.code === ERROR_CODE_TX_REJECTED_BY_USER) {
                console.log('user cancel ' + ERROR_CODE_TX_REJECTED_BY_USER)
                return
            }
            console.error(e);
            checkError(e.message)
        }
        await this.updateBalance()
    }

    buyTokens = async () => {
        // const signer = this._provider.getSigner(0)
        try {
            let amountToken = this.state.inputValue
            const overrides = {
                value: this.state.priceInWei.toString()
            };
            if (this.state.globalMultiplier > 0) {
                amountToken = this.state.countTokensCurrent
            }
            const tx = await this._tokenShop.buyTokens(amountToken, overrides)
            this.setState({
                txBeingSent: tx.hash
            })
            await tx.wait()
            this.fsetTransactionComplete(true)
            this.fsetHash(tx.hash)
            _clear(this.state)
        } catch (e) {
            console.error(e);
            if (e.code === ERROR_CODE_TX_REJECTED_BY_USER) {
                console.log('user cancel' + ERROR_CODE_TX_REJECTED_BY_USER)
                if (this.state.globalMultiplier === 0) {
                    _clear(this.state)
                }
                return
            }
            checkError(e.message)
        }
        await this.updateBalance()
    }

    async updateBalance() {
        const newBalance = (await this._provider.getBalance(this.state.selectAccount))?.toString()
        const countTokens = (await this._tokenShop.tokenBalanceContract())
        const countBNB = await this._tokenShop.provider.getBalance(this._tokenShop.address)
        const multiplier = await this._tokenShop.getMultiplier()
        const countTokensCurrent = await this._tokenShop.tokenBalanceCurrent()
        const isUsedMultiplier = await this._tokenShop.getIsUsed()
        const _globalMultiplier = await this._tokenShop.getGlobalMultiplier()
        const _balanceOfBonuses = await this._tokenShop.tokenBalanceCurrentBonuses()

        const multiplierInt = ethers.utils.formatUnits(multiplier, 0)
        const tokens = ethers.utils.formatUnits(countTokensCurrent, 0);
        const balanceOfBonuses = ethers.utils.formatUnits(_balanceOfBonuses, 0);
        const globalMultiplier = ethers.utils.formatUnits(_globalMultiplier, 0);
        const balanceTokens = ethers.utils.formatUnits(countTokensCurrent, 0)
        this.setState({
            balance: newBalance,
            countTokens: countTokens,
            countTokensCurrent: countTokensCurrent,
            countBNB: countBNB,
            multiplier: multiplierInt,
            isUsedMultiplier: !!isUsedMultiplier,
            globalMultiplier: globalMultiplier,
            _balanceOfBonuses: balanceOfBonuses,
            _balanceTokens: balanceTokens,

        })
        this.fsetBalance(tokens)
        this.fMultiplier(multiplierInt)
        this.fsetIsUserUseMultiplayer(isUsedMultiplier)
        this.fsetGlobalMultiplayer(globalMultiplier)
        await this.getRate()
    }

    getRate = async () => {
        await this.getGasPrice()
        const requestData = await fetch('/api/ratePrice', {
            method: 'POST'
        });
        const dataParse = await requestData.json()
        const price = dataParse.price
        let priceInWei = transTo(this.state.inputValue / price)
        const priceInBnb = (this.state.inputValue / price).toFixed(7)
        const gwei = (this.state.gasPrice).toString()

        if(this.props.active || this.state.globalMultiplier > 0){
            priceInWei = transTo(this.state.countTokensCurrent/10 / price)
        }

        const weiGas = ethers.utils.parseUnits(gwei, "gwei");
        const weiValue = ethers.utils.parseUnits(priceInWei, "wei");
        const totalInWei = ethers.utils.formatUnits(weiGas.add(weiValue), "ether")

        this.setState({
            rate: price,
            priceInWei: priceInWei,
            priceInBnb: priceInBnb,
            totalCostUSD: totalInWei
        });
        showError(this.state,'')
    }

    getGasPrice = async () => {
        if (this.state.gasPrice === 0) {
            const requestData = await fetch('/api/gasPrice', {
                method: 'POST'
            });
            const gasPrice = await requestData.json()
            this.setState({
                gasPrice: gasPrice
            });
        }
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
                await this.handleInput(this.state.countTokensCurrent * this.state.multiplier - this.state.countTokensCurrent)
            }
            if (this.state.globalMultiplier > 0) {
                await this.handleInput(this.state.countTokensCurrent * this.state.globalMultiplier - this.state.countTokensCurrent)
            }

        })

    }

    _connectWallet = async () => {
        if (window.ethereum === undefined) {
            this.setState({
                networkError: "Please install Metamask"
            })
            showError(this.state,"Please install Metamask")
            return
        }

        const [selectedAddress] = await window.ethereum.request({
            method: 'eth_requestAccounts'
        })

        if (!_checkNetwork(HARDHAT_NETWORK_ID)) {
            return
        }

        await this._initialize(selectedAddress)

        window.ethereum.on('accountsChanged', async ([newAddress]) => {
            _resetState(this.state, this.initialState)
            await this._initialize(newAddress)
        })

        window.ethereum.on('chainChanged', async ([networkId]) => {
            return _resetState(this.state, this.initialState)
        })

        localStorage.setItem(FIRSTLY_CONNECTION, true)
    }

    changeAddNetwork = () => {
        _addNetwork().then(() => {
            _addTokenToMetaMask().then(() => {
                setTimeout(this._connectWallet, 500);
            })
        });
    };

    _setNetworkError = (error) => {
        this.setState({
            networkError: error,
            currentError: error
        })
    }

    handleInput = async (value) => {
        this.setState({inputValue: +value});
        this.getRate().then()
    }


    render() {
        const {active, data} = this.props

        return (
            <>
                <div
                    className={"flex flex-col tablet:top-0 top-[-211px] relative right-0 " +
                    "max-w-[497px] " +
                    "mdd:min-h-[650px] min-h-[680px] sx:h-[auto] shadow-[19px_23px_87px_0_#6CB8EF33] " +
                    "md:rounded-tl-2xl md:rounded-tr-2xl md:rounded-bl-none md:rounded-br-none rounded-md sx:rounded-tr-none sx:rounded-tl-none w-full "
                    + (active ? "sx:h-[655px]" : "sx:h-[543px]")

                    }
                >

                    <SwapFormHeader countTokensCurrent={this.state.countTokensCurrent}
                                    _balanceOfBonuses={this.state._balanceOfBonuses}
                                    balance={this.state.balance}
                    />

                    <div
                        className={"flex flex-col items-center relative bg-textBgColor w-full max-w-[497px] sx:px-[21px] px-7 pt-[26px] pb-[26px] rounded-md h-full sx:mx-auto grow "}>

                        {
                            this.state.globalMultiplier > 0 ?
                                <>
                                    <BNXTtoBNB rate={this.state.rate}/>

                                    <span
                                        className={"sm:text-sm text-base font-semibold pb-[20px] leading-[17.41px] sx:mr-[0] w-full text-[#000000] "}>
                           			   						 Buy BNXT with Global multiplier x{this.state.globalMultiplier}
                                    </span>

                                    <MultiplierField inputValue={this.state.inputValue}/>

                                    <BNXTtoBNBamount
                                        valueBnxt = {this.state.inputValue > 0 ? +this.state.inputValue : 0}
                                        valueUsd = {this.state.inputValue ? +this.state.countTokensCurrent /10 : 0}
                                        priceInBnb = {(this.state.priceInBnb / 10).toFixed(FIXED_VALUE)}
                                    />
                                    <div className="w-full">
                                        <div className="w-full mb-[23px]">
                                            <Discount countTokensCurrent={this.state.countTokensCurrent}/>

                                            <TotalCost gasPrice={this.state.gasPrice} totalCostUSD={this.state.totalCostUSD} rate={this.state.rate} fixedValue={FIXED_VALUE}/>
                                        </div>
                                    </div>

                                    <SwapFormButton
                                        isLoading={this.state.isLoading}
                                        active={this.props.active}                                        disabledBtn={!this.state.inputValue || this.state.isLoading}
                                        buy={this.buy}
                                        currentError={this.state.currentError}
                                        _changeAddNetwork={this.changeAddNetwork}
                                        _class={"text-whiteColor rounded-md w-full h-[60px] py-[17px] shadow-[0px_12px_18px_0_#40A6DF] font-medium sm:text-[18px] text-lg transform-gpu transition-transform duration-200 ease-in-out relative flex justify-center gap-[20px] mt-auto "
                                        + (this.state.currentError && this.state.currentError === 'Please connect to another Network' ? "bg-errorColor text-whiteColor z-10" : "bg-gradient-to-r from-gradientFrom via-gradientVia to-gradientTo text-blackColor")
                                        }
                                    />


                                </> :
                                <>
                                    {
                                        this.state.selectAccount &&
                                        <>

                                            <BNXTtoBNB rate={this.state.rate}/>

                                            {
                                                this.props.active ?

                                                    <>
                                                        {
                                                            this.state.isUsedMultiplier ?
                                                                <>
                                                                    <UsedRewardText/>

                                                                </> :
                                                                <>
                                                                    <span
                                                                        className={"sm:text-sm text-base font-semibold pb-[20px] leading-[17.41px] sx:mr-[0] w-full text-blackColor "}>
                           			   						            Buy BNXT with multiplier x{this.state.multiplier}
                           			 					            </span>

                                                                    <MultiplierField inputValue={this.state.inputValue}/>

                                                                    <BNXTtoBNBamount
                                                                        valueBnxt = {this.state.inputValue > 0 ? +this.state.inputValue : 0}
                                                                        valueUsd = {this.state.inputValue ? +this.state.countTokensCurrent /10 : 0}
                                                                        priceInBnb = {(this.state.priceInBnb / 10).toFixed(FIXED_VALUE)}
                                                                    />
                                                                    <div className="w-full">
                                                                        <div className="w-full mb-[23px]">
                                                                            <Discount
                                                                                countTokensCurrent={this.state.countTokensCurrent}
                                                                                inputValue={this.state.inputValue}
                                                                            />
                                                                            <TotalCost gasPrice={this.state.gasPrice} totalCostUSD={this.state.totalCostUSD} rate={this.state.rate} fixedValue={FIXED_VALUE}/>
                                                                        </div>
                                                                    </div>
                                                                    <SwapFormButton
                                                                        isLoading={this.state.isLoading}
                                                                        disabledBtn={!this.state.inputValue || this.state.isLoading}
                                                                        buy={this.buy}
                                                                        currentError={this.state.currentError}
                                                                        _changeAddNetwork={this.changeAddNetwork}
                                                                        active={this.props.active}
                                                                        _class={"text-whiteColor rounded-md w-full h-[60px] py-[17px] shadow-[0px_12px_18px_0_#A5CADE] font-medium sm:text-[18px] text-lg transform-gpu transition-transform duration-200 ease-in-out relative flex justify-center gap-[20px] mt-auto "
                                                                        + (this.state.currentError && this.state.currentError === 'Please connect to another Network' ? "bg-errorColor text-whiteColor z-10" : "bg-gradient-to-r from-gradientFrom via-gradientVia to-gradientTo text-blackColor")
                                                                        }
                                                                    />
                                                                </>
                                                        }
                                                    </>

                                                    :
                                                    <>
                                                        {
                                                            this.state._balanceTokens< 1000 ?
                                                                <>
                                                                    <span
                                                                        className={"sm:text-sm text-base font-semibold pb-[20px] leading-[17.41px] sx:mr-[0] sm:mr-[120px] mr-[140px] sx:w-full text-[#000000] "}>
                            	   						 	            Set up how many BNXT you want to buy
                                           				            </span>
                                                                    <div
                                                                        className="flex flex-col justify-between items-center sx:w-full gap-[10px] text-center mx-auto">
                                                                        <div
                                                                            className={"flex justify-between items-center sx:w-full gap-[9px] "}>
                                                                            {data.slice(0, 5).map(el => (
                                                                                <CoinsAmount key={el.amount}
                                                                                             amount={el.amount}
                                                                                             step={false}
                                                                                             activeAmount={this.state.inputValue}
                                                                                             handleInput={this.handleInput}/>
                                                                            ))}
                                                                        </div>
                                                                        <div
                                                                            className="flex justify-between items-center sx:w-full gap-[9px]">
                                                                            {data.slice(-5).map(el => (
                                                                                <CoinsAmount key={el.amount}
                                                                                             amount={el.amount}
                                                                                             step={false}
                                                                                             activeAmount={this.state.inputValue}
                                                                                             handleInput={this.handleInput}/>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                    {this.state.inputValue > 0 &&
                                                                    <>
                                                                        <p className="pt-[16px] w-full text-start">${this.state.inputValue}</p>

                                                                        <BNXTtoBNBamount
                                                                            valueBnxt = {this.state.inputValue}
                                                                            valueUsd = {this.state.inputValue}
                                                                            priceInBnb = {(+this.state.priceInBnb).toFixed(FIXED_VALUE)}
                                                                        />
                                                                        <div className="w-full">
                                                                            <div className="w-full mb-[23px]">
                                                                                <TotalCost gasPrice={this.state.gasPrice} totalCostUSD={this.state.totalCostUSD} rate={this.state.rate} fixedValue={FIXED_VALUE}/>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                    }
                                                                    <SwapFormButton
                                                                        active={this.props.active}
                                                                        isLoading={this.state.isLoading}
                                                                        disabledBtn={!this.state.inputValue || this.state.isLoading}
                                                                        buy={this.buy}
                                                                        currentError={this.state.currentError}
                                                                        _changeAddNetwork={this.changeAddNetwork}
                                                                        _class={"text-whiteColor rounded-md w-full h-[60px] py-[17px] font-medium sm:text-[18px] shadow-[0px_12px_18px_0_#A5CADE] text-lg transform-gpu transition-transform duration-200 ease-in-out  relative mt-auto flex justify-center gap-[20px] "
                                                                        + (this.state.currentError && this.state.currentError === 'Please connect to another Network' ? "bg-errorColor  z-10" : "bg-gradient-to-r from-gradientFrom via-gradientVia to-gradientTo")
                                                                        }
                                                                    />


                                                                </>
                                                                :
                                                                <GetRewardText/>
                                                        }
                                                    </>
                                            }
                                        </>
                                    }
                                </>
                        }
                        {/*notification*/}
                        {
                            !this.state.selectAccount && !this.state.currentError &&
                            <>
                                <ConnectWalletText/>
                                <ConnectWallet
                                    connectWallet={this._connectWallet}
                                    setNetworkError={this._setNetworkError}
                                    _class={"bg-gradient-to-r from-gradientFrom via-gradientVia to-gradientTo text-whiteColor rounded-md w-full h-[60px] py-[17px] font-medium text-[18px] transform-gpu transition-transform duration-200 ease-in-out hover:scale-95 focus:scale-95 active:scale-95 shadow-[0_12px_18px_0_#A5CADE] relative "}
                                />
                            </>

                        }
                        {
                            !this.state.selectAccount && this.state.currentError === 'Please connect to another Network' &&
                            <>
                                <SwitchNetworkText/>
                                <SwapFormButton
                                    active={this.props.active}
                                    isLoading={this.state.isLoading}
                                    step={step}
                                    buy={this.buy}
                                    currentError={this.state.currentError}
                                    _changeAddNetwork={this.changeAddNetwork}
                                    _class={"text-whiteColor rounded-md w-full h-[60px] py-[17px] bg-[#EB5757] font-medium shadow-[0px_12px_18px_0_#E0CACA] sm:text-[18px] text-lg transform-gpu transition-transform duration-200 ease-in-out hover:scale-95 focus:scale-95 active:scale-95 relative mt-auto "
                                    + (this.state.currentError && this.state.currentError === 'Please connect to another Network' || step === 2 ? "bg-errorColor text-whiteColor z-10" : "bg-gradient-to-r from-gradientFrom via-gradientVia to-gradientTo text-blackColor text-whiteColor"
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