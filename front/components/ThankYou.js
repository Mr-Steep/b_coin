import {Modal} from "./Modal";
import award from "../assets/images/award.png";
import Image from "next/image";
import arrowLight from "../assets/images/arrow-light.svg";
import thanksArrow from "../assets/images/thanks-arrow.svg";
import cross from "../assets/images/cross-black.svg";
import Link from "next/link";


export function ThankYou({getMultiplier, handleSetActive, setTransactionComplete, getIsUserUseMultiplayer, getGlobalMultiplayer}) {

    const handleClick = () => {
        handleSetActive(true)
        setTransactionComplete(false)
    }
    const closeModal = () => {
        setTransactionComplete(false)
    }

    return (
        <Modal>
                <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col justify-between items-center bg-textColor sm:max-w-[350px] max-w-[544px] px-[70px] py-[50px] z-10">
                    <Image src={cross} className="absolute z-10 top-[22px] sx:right-[30px] right-[22px] cursor-pointer" onClick={closeModal} alt={cross} />
                    <div className="flex flex-col justify-between items-center gap-[30px]">
                        <p className="text-3xl font-medium text-center">Thank you!</p>
                        <p className="text-base font-normal text-center">Amet minim mollit non deserunt ullamco est sit aliqua. Get your 90% discount with x{getMultiplier>0 && getMultiplier} multiplier!</p>

                        {!getIsUserUseMultiplayer ?
                            <Link href=""
                                  onClick={handleClick}
                                  className="group mx-auto flex gap-[13px] bg-primaryBgColor items-center justify-between rounded-md md:min-w-[293px] max-w-[293px] max-h-[60px] w-full px-[17px] py-[17px]">
                        <span className="text-textColor text-lg">
                            Get Reward x{getMultiplier>0 && getMultiplier}
                        </span>
                                <Image src={arrowLight} className="w-[23px] h-[23px] ml-[90px] group-hover:rotate-45 transition duration-300 ease-in" alt={''}/>
                            </Link>
                            :
                            <Link href=""
                                  onClick={closeModal}
                                  className="group mx-auto flex gap-[13px] bg-primaryBgColor items-center justify-between rounded-md md:min-w-[293px] max-w-[293px] max-h-[60px] w-full px-[17px] py-[17px]">
                        <span className="text-textColor text-lg">
                            Back to Home page
                        </span>
                                <Image src={arrowLight} className="w-[23px] h-[23px] ml-[90px] group-hover:rotate-45 transition duration-300 ease-in" alt={''}/>
                            </Link>
                        }
                    </div>


                </div>


        </Modal>
    )
}
