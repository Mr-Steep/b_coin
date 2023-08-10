import swapArrowBlack from "../assets/images/swapArrowBlack.svg";
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
import {Modal} from "./Modal";
import data from "../assets/bNXTdata";

const FIXED_VALUE = 7
export const HARDHAT_NETWORK_ID = '31337'
export const BSC_NETWORK_ID = '97'
export const NETWORK_ID = HARDHAT_NETWORK_ID

const ERROR_CODE_TX_REJECTED_BY_USER = 4001

let step


export class SwapFormTips extends Component {
    constructor(props) {
        super(props)

        step = props.step

    }


    render() {
        const {active, data, step, setNewStep, tips, closeModal} = this.props
        console.log('step',step)

        const style_contract = {
            "background": 'red',
            "padding": '1rem',
            "position": 'absolute',
            "top": 0,
            "right": 0,
        }

        return (
            <>

                <div
                    className={"flex flex-col justify-between bg-textColor relative md:top-0 top-[-228px] " +
                    "max-w-[497px] " +
                    "min-h-[670px] sx:h-[auto] shadow-[19px_23px_87px_0_#6CB8EF33] " +
                    "md:rounded-tl-2xl md:rounded-tr-2xl md:rounded-bl-none md:rounded-br-none rounded-md sx:rounded-tr-none sx:rounded-tl-none w-full md:mt-0 mt-[22px] sx:px-4 pb-[27px] sx:pb-[40px] md:mb-[-118px] "
                    + (active ? "sx:h-[655px]" : step === 4 ? "z-10" : "sx:h-[543px]")
                    }
                >

                    {/*steps*/}
                    <Step step={step} setNewStep={setNewStep} closeModal={closeModal}/>

                    <div className="bg-primaryBgColor flex justify-between items-end w-full sm:rounded-t-[10px] pt-5 mb-[27px] sm:px-4 pl-7 pr-[35px] sx:mx-auto sx:max-w-[343px]">
                        <div className="flex flex-col gap-10 pb-5">
                            <div className="flex flex-col">
                                <p className="text-buttonBgColor text-sm leading-4 mb-2">Your BNXT balance</p>
                                <div className="flex items-center">
                                    <Image src={swapArrowBlack} className="w-[34px] h-[34px] mr-3" alt={swapArrowBlack}/>
                                    <span className="text-textColor sm:text-[32px] text-4xl font-semibold sm:leading-[34.82px] leading-10">
                                        0
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col h-[62px]">
                                {step === 3 || step === 4 &&
                                    <>
                                        <p className="text-buttonBgColor text-sm leading-4 mb-2">Your BNB balance</p>
                                        <div className="flex items-center">
                                            <Image src={bnbLogo} className="w-[34px] h-[34px] mr-3" alt={bnbLogo}/>
                                            <span className="text-textColor sm:text-[32px] text-4xl font-semibold sm:leading-[34.82px] leading-10">
                                        0,895673
                                        </span>
                                        </div>

                                    </>
                                }
                            </div>

                        </div>

                        <Image src={walletPic} className="w-[211px] h-[175px] sm:hidden relative left-3" alt={walletPic}/>
                        <Image src={walletPicMob} className="w-[115px] h-[185px] sm:block hidden relative left-3" alt={walletPicMob}/>

                    </div>


                        <div className={"flex flex-col items-center relative bg-textBgColor w-full max-w-[497px] sx:px-0 px-7 pt-[26px] rounded-md h-full sx:mx-auto "
                            +(step === 3 && "mb-[200px]")
                        }>


                            <div className="w-full flex flex-col justify-between items-center">

                                {
                                    step === 1 &&
                                    <div className="flex flex-col justify-between items-center gap-4 max-w-[320px] mt-[83px] mb-[89px]">
                                        <Image src={metamask} className="w-[88px] h-[88px]" alt={metamask}/>
                                        <p className="text-3xl font-medium leading-[32.64px] mt-10">Connect your wallet</p>
                                        <p className="text-base font-normal leading-[26px] text-center">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</p>
                                    </div>
                                }

                                {
                                    step === 2 &&
                                    <div className="flex flex-col justify-between items-center gap-4 max-w-[320px] mt-[70px] mb-[72px]">
                                        <Image src={bnbLogo} className="w-[88px] h-[88px]" alt={bnbLogo}/>
                                        <p className="text-3xl font-medium leading-[32.64px]">Switch network</p>
                                        <p className="text-base font-normal leading-[26px]">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</p>
                                    </div>
                                }


                                {
                                    (step === 3 || step === 4) &&
                                    <>
                                        <div className="bg-gradient-to-r from-[#34C4E1] via-[#5B86F8] to-[#7165ED] w-full rounded-[49px] p-[1px] mb-[26px] ">
                                            <div className="bg-white p-2 flex justify-center gap-3 items-center rounded-[49px]  ">
                                                <Image src={lightningBlue} className="" alt={lightningBlue}/>
                                                <p className="text-primaryBgColor text-base leading-[17.41px] font-medium">1 bNXT <span
                                                    className="text-primaryBgColor text-base leading-[17.41px] font-light">($1.00)</span> = BNB
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex justify-between text-primaryBgColor mb-[15px] leading-[22px]">
                                        <span className={"sm:text-sm text-base font-semibold leading-[17.41px] sx:mr-[70px] sm:mr-[120px] mr-[140px] "
                                        + (step === 3 ? "z-10 text-textColor" : "")
                                        }>Set up how many BNXT you want to buy</span>
                                        </div>

                                        <div className="relative">

                                            <div className="bg-textColor relative flex justify-between h-[66px] w-full rounded-md py-[11px] mb-[23.5px] "
                                            >
                                                <div className="flex flex-col justify-between items-start gap-[10px] relative">
                                                    <div className="flex flex-col justify-between items-center max-w-[440px] gap-[10px] text-center mx-auto">
                                                        <div
                                                            className={"flex justify-between items-center w-full gap-[9px] "
                                                            + ( step === 3 && "z-10")
                                                            }>
                                                            {data.slice(0, 5).map(el => (
                                                                <CoinsAmount key={el.amount} amount={el.amount}
                                                                             step={step}
                                                                             tips={tips}
                                                                />
                                                            ))}
                                                        </div>
                                                        <div
                                                            className="flex justify-between items-center gap-[9px]">
                                                            {data.slice(-5).map(el => (
                                                                <CoinsAmount key={el.amount} amount={el.amount}
                                                                             step={step}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>

                                            {
                                                (step === 4 && step !== 3) &&
                                                <div className="flex flex-col justify-between items-start">
                                                    <p className="text-base">$ 400</p>
                                                    <div className="bg-textColor relative flex flex-col justify-between items-center w-full rounded-md mb-5 mt-[26px]"
                                                    >
                                                        <div className="flex justify-between items-center border-b-[1px] border-[#F2F2F2] pb-5">
                                                            <Image src={swapArrowWhite} alt={swapArrowWhite} className="w-[30px] h-[30px] mr-[6px]"/>
                                                            <span className="bg-textColor text-primaryBgColor sm:text-sm text-lg font-medium leading-5 mr-2"
                                                            >400 BNXT ($400) = </span>
                                                            <Image src={bnbLogo} className="w-[30px] h-[30px] mr-[6px]" alt={bnbLogo}/>
                                                            <span className="bg-textColor text-primaryBgColor sm:text-sm text-lg font-medium leading-5">
                                                            0.74734 BNB
                                                        </span>

                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col justify-between items-center w-full mb-[53px]">

                                                        <div
                                                            className="flex justify-between items-center w-full text-primaryBgColor mb-[10px]">
                                                            <p className="sm:text-sm text-base font-normal leading-[17.41px]">Network fee</p>
                                                            <div className="flex justify-between items-center gap-[8px]">
                                                                <Image src={gas} alt={''}/>
                                                                <span className="text-base font-normal leading-[17.41px]">~ $46,8</span>
                                                            </div>
                                                        </div>

                                                        <div
                                                            className="flex justify-between items-center w-full text-primaryBgColor ">
                                                            <p className="sm:text-sm text-base font-normal leading-[17.41px]">Total Cost</p>
                                                            <span className="sm:text-sm text-base font-normal leading-[17.41px]">$446,856</span>

                                                        </div>
                                                    </div>


                                                </div>
                                            }

                                        </div>
                                    </>
                                }

                            </div>



                        </div>

                        <div className="px-7">
                            {
                                step === 1
                                    ?
                                    <ConnectWallet
                                        _class={"bg-gradient-to-r from-[#29C8A9] via-[#208ED0] to-[#703AAD] text-textColor rounded-md max-w-[440px] w-full h-[60px] py-[17px] font-medium text-[18px] transform-gpu transition-transform duration-200 ease-in-out hover:scale-95 focus:scale-95 active:scale-95 shadow-[0_12px_18px_0_#40A6DF5C] relative "
                                        + (step === 1 && "z-10")}
                                    />
                                    :
                                    <SwapFormButton
                                        step={step === 2}
                                        _class={"rounded-md w-full h-[60px] py-[17px] font-medium sm:text-sm text-lg text-textColor transform-gpu transition-transform duration-200 ease-in-out hover:scale-95 focus:scale-95 active:scale-95 relative "
                                        + (step === 2 ? "bg-errorColor text-textColor z-10" : "bg-gradient-to-r from-[#29C8A9] via-[#208ED0] to-[#703AAD] text-primaryBgColor"
                                        )
                                        }
                                    />
                            }
                        </div>

                </div>
            </>
        )
    }
}