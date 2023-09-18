import {Component} from 'react'
import Image from "next/image";
import swapArrowBlack from "../../assets/images/swapArrowBlack.svg";
import bnbLogo from "../../assets/images/bnb-logo.svg";
import walletPic from "../../assets/images/wallet-pic.png";
import walletPicMob from "../../assets/images/wallet-pic-mob.png";
import {ConnectWallet} from "../ConnectWallet";
import {CoinsAmount} from "../CoinsAmount";
import {Step} from "../Step";
import {SwapFormButton} from "../SwapFormButton";
import {ConnectWalletText} from "../ConnectWalletText";
import {SwitchNetworkText} from "../SwitchNetworkText";
import {BNXTtoBNB} from "../BNXTtoBNB";

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
                    className={"flex flex-col justify-between bg-whiteColor relative tablet:top-0 top-[-220px] " +
                    "max-w-[497px] " +
                    "mdd:min-h-[650px] min-h-[680px] sx:h-[auto] shadow-[19px_23px_87px_0_#6CB8EF33] " +
                    "md:rounded-tl-2xl md:rounded-tr-2xl md:rounded-bl-none md:rounded-br-none rounded-md w-full md:mt-[7px] mt-[22px] sx:px-0 pb-[27px] sx:pb-[40px] md:mb-[-118px] "
                    + (active ? "sx:h-[655px]" : step === 4 ? "z-10" : "sx:h-[543px]")
                    }
                >

                    {/*steps*/}
                    <Step step={step} setNewStep={setNewStep} closeModal={closeModal}/>

                    <div className="bg-blackColor flex justify-between w-full rounded-t-[10px] rounded-b-0 rounded-l-0 pt-[23px] sm:px-4 px-7 sx:mx-auto">
                        <div className="flex flex-col justify-between pt-[10px] pb-5">
                            <div className="flex flex-col">
                                <p className="text-blueColor text-sm leading-4 mb-2">Your BNXT balance</p>
                                <div className="flex items-center">
                                    <Image src={swapArrowBlack} className="w-[34px] h-[34px] mr-3" alt={swapArrowBlack}/>
                                    <span className="text-whiteColor sm:text-[32px] text-4xl font-semibold sm:leading-[34.82px] leading-10">
                                        0
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col h-[62px]">
                                {step === 3 || step === 4 &&
                                    <>
                                        <p className="text-blueColor text-sm leading-4 mb-2">Your BNB balance</p>
                                        <div className="flex items-center">
                                            <Image src={bnbLogo} className="w-[34px] h-[34px] mr-3" alt={bnbLogo}/>
                                            <span className="text-whiteColor sm:text-[32px] text-4xl font-semibold sm:leading-[34.82px] leading-10">
                                        0,895673
                                        </span>
                                        </div>

                                    </>
                                }
                            </div>

                        </div>

                        <Image src={walletPic} className="w-[211px] h-[175px] tablet:hidden relative left-3" alt={walletPic}/>
                        <Image src={walletPicMob} className="w-[115px] h-[185px] tablet:block hidden relative left-3" alt={walletPicMob}/>

                    </div>


                        <div className={"flex flex-col items-center relative bg-textBgColor w-full max-w-[497px] sx:px-0 px-7 pt-[26px] rounded-md h-full sx:mx-auto "
                            +(step === 3 && "mb-[200px]")
                        }>


                            <div className="w-full flex flex-col justify-between items-center">

                                {
                                    step === 1 &&
                                    <ConnectWalletText/>
                                }

                                {
                                    step === 2 &&
                                    <SwitchNetworkText/>
                                }


                                {
                                    (step === 3 || step === 4) &&
                                    <div className=" "

                                    >
                                        <BNXTtoBNB/>

                                        <div className="flex justify-between text-blackColor mb-[15px] leading-[22px]">
                                        <span className={"sm:text-sm text-base font-semibold leading-[17.41px] sx:mr-[70px] sm:mr-[120px] mr-[140px] "
                                        + (step === 3 ? "z-10 text-whiteColor" : "")
                                        }>Set up how many BNXT you want to buy</span>
                                        </div>

                                        <div className="relative">

                                            <div className="bg-whiteColor relative flex justify-between h-[66px] w-full rounded-md py-[11px] mb-[23.5px] "
                                            >
                                                <div
                                                    className="flex flex-col justify-between items-center sx:w-full gap-[10px] text-center mx-auto">
                                                    <div
                                                        className={"flex justify-between items-center sx:w-full gap-[9px] "}>
                                                        {data.slice(0, 5).map(el => (
                                                            <CoinsAmount key={el.amount} amount={el.amount}
                                                                         step={step}
                                                                         tips={tips}/>
                                                        ))}
                                                    </div>
                                                    <div
                                                        className="flex justify-between items-center sx:w-full gap-[9px]">
                                                        {data.slice(-5).map(el => (
                                                            <CoinsAmount key={el.amount} amount={el.amount}
                                                                         step={step}
                                                                         />
                                                        ))}
                                                    </div>
                                                </div>

                                            </div>


                                        </div>
                                    </div>
                                }

                            </div>



                        </div>

                        <div className="px-7">
                            {
                                step === 1
                                    ?
                                    <ConnectWallet
                                        _class={"bg-gradient-to-r from-gradientFrom via-gradientVia to-gradientTo text-whiteColor rounded-md max-w-[440px] w-full h-[60px] py-[17px] font-medium text-[18px] transform-gpu transition-transform duration-200 ease-in-out shadow-[0_12px_18px_0_#40A6DF5C] relative "
                                        + (step === 1 && "z-10")}
                                    />
                                    :
                                    <SwapFormButton
                                        step={step === 2}
                                        _class={"rounded-md w-full h-[60px] py-[17px] font-medium sm:text-sm text-lg text-whiteColor transform-gpu transition-transform duration-200 ease-in-out relative "
                                        + (step === 2 ? "bg-errorColor text-whiteColor z-10" : "bg-gradient-to-r from-gradientFrom via-gradientVia to-gradientTo text-blackColor"
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
