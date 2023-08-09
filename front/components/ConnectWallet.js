import {Fragment, useRef, useState, useEffect} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import Image from "next/image";
import metamask from "@/assets/images/metamask.png";
import {NETWORK_ID} from "@/components/SwapForm"


export function ConnectWallet({_class, connectWallet, setNetworkError}) {

    const [open, setOpen] = useState(false)
    const [errorMetamask, setErrorMetamask] = useState(false)
    const cancelButtonRef = useRef(null)

    const [isDisabled, setIsDisabled] = useState(false)

    useEffect(() => {
        if(localStorage.getItem('steps')) {
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
    })


    const openModal = () => {
            setOpen(true)
    }


    const _clickMetamask = () => {
        const provider = getCurrentProvider()

        if (provider === 'metamask') {
            console.log('MetaMask поддерживается');
            if (typeof window.ethereum !== 'undefined') {
                ethereum
                    .request({method: 'net_version'})
                    .then((networkId) => {
                        console.log('Current network ID:', networkId);
                        console.log('NETWORK_ID', NETWORK_ID);
                        if (NETWORK_ID !== networkId) {
                            setNetworkError("Please connect to another Network")
                            setOpen(false)

                        } else {
                            connectWallet()
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                console.error('MetaMask is not installed');
            }
            return 2;

        } else {
            setErrorMetamask(true)
            console.log('MetaMask is not installed');
        }
    }
    const getCurrentProvider = () => {
        if (!window.web3) return 'unknown';

        if (window.web3.currentProvider.isMetaMask)
            return 'metamask';

        if (window.web3.currentProvider.isTrust)
            return 'trust';

        if (window.web3.currentProvider.isGoWallet)
            return 'goWallet';

        if (window.web3.currentProvider.isAlphaWallet)
            return 'alphaWallet';

        if (window.web3.currentProvider.isStatus)
            return 'status';

        if (window.web3.currentProvider.isToshi)
            return 'coinbase';

        if (typeof window.__CIPHER__ !== 'undefined')
            return 'cipher';

        if (window.web3.currentProvider.constructor.name === 'EthereumProvider')
            return 'mist';

        if (window.web3.currentProvider.constructor.name === 'Web3FrameProvider')
            return 'parity';

        if (window.web3.currentProvider.host && window.web3.currentProvider.host.indexOf('infura') !== -1)
            return 'infura';

        if (window.web3.currentProvider.host && window.web3.currentProvider.host.indexOf('localhost') !== -1)
            return 'localhost';

        return 'unknown';
    }


    return (
        <>
            <button type="button"
                    className={_class}
                    disabled={isDisabled}
                    onClick={openModal}
            >
                Connect wallet
            </button>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-4 sm:p-0 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className=" bg-white relative w-full max-w-sm min-h-full rounded-xl">
                                    <div className="p-8 sm:p-6">
                                        <div>
                                            <div className="sm:flex ">
                                                <div className="mt-3 sm:ml-4 sm:mt-0">
                                                    <Dialog.Title as="h3"
                                                                  className="text-2xl pb-2 font-semibold leading-6 text-gray-900">
                                                        Connect Wallet
                                                    </Dialog.Title>
                                                    <div className="pt-5">
                                                        <p className="text-sm text-gray-700">
                                                            Start by connecting with one of the wallets below. Be
                                                            sure
                                                            to
                                                            store your private keys or seed phrase securely. Never
                                                            share
                                                            them with anyone.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-center py-6 text-xs">
                                            <div
                                                className='transform-gpu transition-transform duration-200 ease-in-out hover:scale-95 focus:scale-95 active:scale-95'>
                                                <Image src={metamask}
                                                       onClick={_clickMetamask}
                                                       className="w-16 h-16 cursor-pointer hover:opacity-80 "
                                                       alt={'Metamask'}/>
                                                <h4 className="my-2 text-gray-900 dark:text-white">Metamask</h4>
                                            </div>
                                        </div>


                                        <div className="">
                                            <a type="button"
                                                    target='_blank'
                                                    href='/onboarding'
                                                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-2xl text-sm px-5 py-2.5 mr-2 mb-2 text-center inline-flex items-center  transform-gpu transition-transform duration-200 ease-in-out hover:scale-95 focus:scale-95 active:scale-95">
                                                Learn How to Connect
                                                <svg aria-hidden="true" className="w-5 h-5 ml-2 -mr-1"
                                                     fill="currentColor"
                                                     viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd"
                                                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                                          clipRule="evenodd"></path>
                                                </svg>
                                            </a>
                                        </div>

                                        {
                                            errorMetamask &&
                                            <div
                                                className="p-4 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300"
                                                role="alert">
                                                <span
                                                    className="font-medium">Metamask is not installed or disabled</span>
                                            </div>
                                        }
                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}



{/*    <div className="w-full flex flex-col justify-between items-center">*/}

{/*        /!*Vasil, please check conditions*!/*/}
{/*        {*/}
{/*            this.state.selectAccount && !this.state.isUsedMultiplier   &&*/}
{/*            <>*/}
{/*                <div*/}
{/*                    className="bg-gradient-to-r from-[#34C4E1] via-[#5B86F8] to-[#7165ED] w-full rounded-[49px] p-[1px] mb-[26px] ">*/}
{/*                    <div*/}
{/*                        className="bg-white p-2 flex justify-center gap-3 items-center rounded-[49px]  ">*/}
{/*                        <Image src={lightningBlue} className="" alt={lightningBlue}/>*/}
{/*                        <p className="text-primaryBgColor text-base leading-[17.41px] font-medium">1*/}
{/*                            bNXT <span*/}
{/*                                className="text-primaryBgColor text-base leading-[17.41px] font-light">($1.00)</span> = {parseFloat(1 / (this.state.rate * 1)).toFixed(5)} BNB*/}
{/*                        </p>*/}
{/*                    </div>*/}
{/*                </div>*/}

{/*<div className="flex justify-between text-primaryBgColor mb-[15px] leading-[22px]">*/}
{/*    /!*Vasil, please check conditions*!/*/}
{/*    {*/}
{/*        this.props.active*/}
{/*            ?*/}
{/*            <span className="sm:text-sm text-base font-semibold leading-[17.41px]">Buy BNXT with multiplier x{this.state.multiplier} </span>*/}
{/*            :*/}
{/*            <span*/}
{/*                className={"sm:text-sm text-base font-semibold leading-[17.41px] sx:mr-[70px] sm:mr-[120px] mr-[140px] "}>*/}
{/*                Set up how many BNXT you want to buy*/}
{/*            </span>*/}
{/*    }*/}

{/*</div>*/}

{/*                <div className={"flex relative "*/}
{/*                    + (this.state.inputs ? 'flex-col' : 'flex-col-reverse'*/}
{/*                    )}>*/}

{/*                    <div*/}
{/*                        className="bg-textColor relative flex justify-between h-[66px] w-full rounded-md py-[11px] mb-[23.5px] "*/}
{/*                    >*/}
{/*                        <div*/}
{/*                            className="flex flex-col justify-between items-start gap-[10px] relative">*/}
{/*                            /!*Vasil, please check conditions*!/*/}
{/*                            {*/}
{/*                                this.props.active ?*/}
{/*                                    <div*/}
{/*                                        className="flex justify-between items-center bg-[#F2F2F2] max-w-[440px] w-full rounded-[6px] pr-6 pl-4 py-[10px]">*/}
{/*                                        <input*/}
{/*                                            readOnly={active || modalVisible}*/}
{/*                                            value={this.state.inputValue}*/}
{/*                                            name="number"*/}
{/*                                            className="appearance-none bg-[#F2F2F2] text-primaryBgColor md:text-3xl text-[34px] sx:text-[24px] leading-[37] outline-0 w-full h-[44px]"*/}
{/*                                        />*/}
{/*                                        {*/}
{/*                                            this.state.priceInBnb > 0 &&*/}
{/*                                            <span className="text-primaryBgColor">$*/}
{/*                                                {*/}
{/*                                                    this.props.active*/}
{/*                                                        ? (this.state.rate * this.state.priceInBnb / 10).toFixed(FIXED_VALUE)*/}
{/*                                                        : (this.state.rate * this.state.priceInBnb).toFixed(FIXED_VALUE)*/}
{/*                                                }*/}
{/*                                            </span>*/}
{/*                                        }*/}
{/*                                    </div>*/}
{/*                                    :*/}

{/*                                    <div*/}
{/*                                        className="flex flex-col justify-between items-center max-w-[440px] gap-[10px] text-center mx-auto">*/}
{/*                                        <div*/}
{/*                                            className={"flex justify-between items-center w-full gap-[9px] "}>*/}
{/*                                            {data.slice(0, 5).map(el => (*/}
{/*                                                <CoinsAmount key={el.amount} amount={el.amount}*/}
{/*                                                             step={false}*/}
{/*                                                             activeAmount={this.state.activeAmount}*/}
{/*                                                             handleAmount={this.handleAmount}/>*/}
{/*                                            ))}*/}
{/*                                        </div>*/}
{/*                                        <div*/}
{/*                                            className="flex justify-between items-center gap-[9px]">*/}
{/*                                            {data.slice(-5).map(el => (*/}
{/*                                                <CoinsAmount key={el.amount} amount={el.amount}*/}
{/*                                                             step={false}*/}
{/*                                                             activeAmount={this.state.activeAmount}*/}
{/*                                                             handleAmount={this.handleAmount}/>*/}
{/*                                            ))}*/}
{/*                                        </div>*/}
{/*                                    </div>*/}
{/*                            }*/}

{/*                        </div>*/}

{/*                    </div>*/}

{/*Vasil, please check conditions*/}
{/*{*/}
{/*    this.state.value &&*/}
{/*    <>*/}
{/*        <p>{this.state.value}</p>*/}
{/*        <div*/}
{/*            className="bg-textColor relative flex justify-between items-center w-full rounded-md mb-5 mt-[26px]"*/}
{/*        >*/}
{/*            <div*/}
{/*                className="flex justify-between items-center border-b-[1px] border-[#F2F2F2] pb-5">*/}
{/*                <Image src={swapArrowWhite} alt={swapArrowWhite}*/}
{/*                       className="w-[30px] h-[30px] mr-[6px]"/>*/}
{/*                <span*/}
{/*                    className="bg-textColor text-primaryBgColor sm:text-sm text-lg font-medium leading-5 mr-2"*/}
{/*                >{this.state.value} BNXT ({this.state.value}) = </span>*/}
{/*                <Image src={bnbLogo} className="w-[30px] h-[30px] mr-[6px]"*/}
{/*                       alt={bnbLogo}/>*/}
{/*                <span*/}
{/*                    className="bg-textColor text-primaryBgColor sm:text-sm text-lg font-medium leading-5">*/}
{/*                    {*/}
{/*                        this.state.priceInBnb ??*/}
{/*                        this.state.priceInBnb.toFixed(FIXED_VALUE)*/}
{/*                    }*/}
{/*                    BNB*/}
{/*                </span>*/}

{/*            </div>*/}

{/*        </div>*/}
{/*    </>*/}
{/*}*/}

{/*                    {*/}
{/*                        this.props.active && this.state.countTokensCurrent &&*/}
{/*                        <>*/}
{/*                            <p>{this.state.countTokensCurrent * this.state.multiplier}</p>*/}
{/*                            <div*/}
{/*                                className="bg-textColor relative flex justify-between items-center w-full rounded-md mb-5 mt-[26px]"*/}
{/*                            >*/}
{/*                                <div*/}
{/*                                    className="flex justify-between items-center border-b-[1px] border-[#F2F2F2] pb-5">*/}
{/*                                    <Image src={swapArrowWhite} alt={swapArrowWhite}*/}
{/*                                           className="w-[30px] h-[30px] mr-[6px]"/>*/}
{/*                                    <span*/}
{/*                                        className="bg-textColor text-primaryBgColor sm:text-sm text-lg font-medium leading-5 mr-2"*/}
{/*                                    >{this.state.countTokensCurrent * this.state.multiplier} BNXT (${this.state.countTokensCurrent * this.state.multiplier / 10}) = </span>*/}
{/*                                    <Image src={bnbLogo} className="w-[30px] h-[30px] mr-[6px]"*/}
{/*                                           alt={bnbLogo}/>*/}
{/*                                    <span*/}
{/*                                        className="bg-textColor text-primaryBgColor sm:text-sm text-lg font-medium leading-5">*/}
{/*                                        {*/}
{/*                                            this.state.priceInBnb / 10 ??*/}
{/*                                            this.state.priceInBnb.toFixed(FIXED_VALUE) / 10*/}
{/*                                        }*/}
{/*                                        BNB*/}
{/*                                    </span>*/}

{/*                                </div>*/}

{/*                            </div>*/}
{/*                        </>*/}
{/*                    }*/}

{/*                </div>*/}
{/*            </>*/}
{/*        }*/}

{/*    </div>*/}

{/*    /!*Vasil, please check conditions*!/*/}
{/*    /!*-------расчет стоимости-----------*!/*/}
{/*    {*/}
{/*        this.state.selectAccount && !this.state.isUsedMultiplier  &&*/}

{/*        <div className="w-full">*/}
{/*            <div className="w-full mb-[53px]">*/}
{/*                {*/}
{/*                    this.props.active &&*/}
{/*                    <div*/}
{/*                        className="flex justify-between items-center text-[#EB5757] mb-[10px]">*/}
{/*                        <p className="sm:text-sm text-base font-normal leading-[17.41px]">Discount</p>*/}
{/*                        <span*/}
{/*                            className="sm:text-sm text-base font-normal leading-[17.41px]">90% (${this.state.countTokensCurrent * this.state.multiplier - this.state.countTokensCurrent * this.state.multiplier / 10})</span>*/}
{/*                    </div>*/}
{/*                }*/}

{/*                <div*/}
{/*                    className="flex justify-between items-center text-primaryBgColor mb-[10px]">*/}
{/*                    <p className="sm:text-sm text-base font-normal leading-[17.41px]">Network fee</p>*/}
{/*                    <div className="flex justify-between items-center gap-[8px]">*/}
{/*                        <Image src={gas} alt={''}/>*/}
{/*                        {*/}
{/*                            this.state.gasPrice &&*/}
{/*                            <span*/}
{/*                                className="text-base font-normal leading-[17.41px]">{this.state.gasPrice} Gwei</span>*/}
{/*                        }*/}
{/*                    </div>*/}
{/*                </div>*/}

{/*                <div*/}
{/*                    className="flex justify-between items-center text-primaryBgColor ">*/}
{/*                    <p className="sm:text-sm text-base font-normal leading-[17.41px]">Total Cost</p>*/}
{/*                    {*/}
{/*                        this.state.totalCostUSD && this.props.active*/}
{/*                            ?*/}
{/*                            <span className="sm:text-sm text-base font-normal leading-[17.41px]"> ~ $ {(this.state.totalCostUSD * this.state.rate / 10).toFixed(FIXED_VALUE)}</span>*/}
{/*                            :*/}
{/*                            <span className="sm:text-sm text-base font-normal leading-[17.41px]"> ~ $ {(this.state.totalCostUSD * this.state.rate).toFixed(FIXED_VALUE)}</span>*/}
{/*                    }*/}
{/*                </div>*/}
{/*            </div>*/}
{/*        </div>*/}

{/*    }*/}
{/*    /!*-------END расчет стоимости-----------*!/*/}


{/*    /!*Vasil, please check conditions*!/*/}
{/*    {*/}
{/*        this.state.currentError && this.state.currentError !== 'Please connect to another Network' && !this.state.inputValue > 0*/}
{/*        &&*/}
{/*        <div className="flex justify-content items-start max-w-[375px] mb-[89px]">*/}
{/*            <Image src={alert_circle} className="mr-[14px]" alt={alert_circle}/>*/}
{/*            <p className="text-base leading-[17.41px] text-[#EB5757] ">*/}
{/*                {this.state.currentError}*/}
{/*            </p>*/}

{/*        </div>*/}
{/*    }*/}
{/*    /!*Vasil, please check conditions*!/*/}
{/*    {*/}
{/*        (!this.state.selectAccount) && this.state.currentError !== 'Please connect to another Network' &&*/}
{/*        <div*/}
{/*            className="flex flex-col justify-between items-center gap-4 max-w-[320px] mt-[83px] mb-[89px]">*/}
{/*            <Image src={metamask} className="w-[88px] h-[88px]" alt={metamask}/>*/}
{/*            <p className="text-3xl font-medium leading-[32.64px] mt-10">Connect your wallet</p>*/}
{/*            <p className="text-base font-normal leading-[26px] text-center">Amet minim mollit non*/}
{/*                deserunt ullamco est sit aliqua dolor do amet sint.</p>*/}
{/*        </div>*/}

{/*    }*/}
{/*    /!*Vasil, please check conditions*!/*/}
{/*    {*/}
{/*        !this.state.selectAccount && this.state.currentError === 'Please connect to another Network' &&*/}
{/*        <div*/}
{/*            className="flex flex-col justify-between items-center gap-4 max-w-[320px] mt-[70px] mb-[72px]">*/}
{/*            <Image src={bnbLogo} className="w-[88px] h-[88px]" alt={bnbLogo}/>*/}
{/*            <p className="text-3xl font-medium leading-[32.64px]">Switch network</p>*/}
{/*            <p className="text-base font-normal leading-[26px]">Amet minim mollit non deserunt*/}
{/*                ullamco est sit aliqua dolor do amet sint.</p>*/}
{/*        </div>*/}

{/*    }*/}

{/*    {*/}
{/*        this.state.totalTokens >= 1000  && !this.props.active &&*/}
{/*        <div className="flex flex-col justify-content items-center gap-4 px-[88px] mt-[125px] mb-[118px]">*/}
{/*            <p className="text-3xl font-medium leading-[32.64px]">Please note!</p>*/}
{/*            <p className="text-base font-normal leading-[26px] text-center max-w-[320px] w-full">Your current balance is 1000 BNXT.*/}
{/*                You can no longer buy currency.*/}
{/*                Please get your reward!</p>*/}
{/*        </div>*/}
{/*    }*/}


{/*    {*/}
{/*        this.state.isUsedMultiplier  &&*/}
{/*        <div*/}
{/*            className="flex flex-col justify-content items-center gap-4 px-[70px] mt-[125px] mb-[118px]">*/}
{/*            <p className="text-3xl font-medium leading-[32.64px] text-center max-w-[438px] w-full">You*/}
{/*                have already used the reward</p>*/}
{/*            <p className="text-base font-normal leading-[26px] text-center max-w-[320px] w-full">Amet*/}
{/*                minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</p>*/}
{/*        </div>*/}
{/*    }*/}


{/*</div>*/}
{/*{*/}
{/*    this.state.isUsedMultiplier &&*/}
{/*    <div className="px-7">*/}
{/*        {*/}
{/*            !this.state.selectAccount && !this.state.currentError*/}
{/*                ?*/}
{/*                <ConnectWallet*/}
{/*                    connectWallet={this._connectWallet}*/}
{/*                    setNetworkError={this._setNetworkError}*/}
{/*                    _class={"bg-gradient-to-r from-[#29C8A9] via-[#208ED0] to-[#703AAD] text-textColor rounded-md w-full h-[60px] py-[17px] font-medium text-[18px] transform-gpu transition-transform duration-200 ease-in-out hover:scale-95 focus:scale-95 active:scale-95 shadow-[0_12px_18px_0_#40A6DF5C] relative "}*/}
{/*                />*/}
{/*                :*/}
{/*                <SwapFormButton*/}
{/*                    buy={this.buy}*/}
{/*                    currentError={this.state.currentError}*/}
{/*                    _changeAddNetwork={this.changeAddNetwork}*/}
{/*                    _class={"rounded-md w-full h-[60px] py-[17px] font-medium sm:text-sm text-lg transform-gpu transition-transform duration-200 ease-in-out hover:scale-95 focus:scale-95 active:scale-95 relative "*/}
{/*                        + (this.state.currentError && this.state.currentError === 'Please connect to another Network' ? "bg-errorColor text-textColor z-10" : "bg-gradient-to-r from-[#29C8A9] via-[#208ED0] to-[#703AAD] text-primaryBgColor")*/}
{/*                    }*/}
{/*                />*/}
{/*        }*/}