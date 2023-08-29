import Image from "next/image";
import swapArrowBlack from "../../assets/images/swapArrow.svg";
import {ethers} from "ethers";
import bnbLogo from "../../assets/images/bnb-logo.svg";
import walletPic from "../../assets/images/wallet-pic.png";
import walletPicMob from "../../assets/images/wallet-pic-mob.png";
import React from "react";


export function SwapFormHeader({countTokensCurrent, _balanceOfBonuses, balance}) {

    return (
        <div
            className="bg-blackColor flex justify-between w-full rounded-t-[10px] rounded-b-0 rounded-l-0 pt-[23px] sm:px-4 px-7 sx:mx-auto ">
            <div className="flex flex-col justify-between pt-[10px] pb-5">
                <div className="flex flex-col">
                    <p className="text-blueColor text-sm leading-4 mb-2">Your BNXT balance</p>
                    <div className="flex items-center">
                        <Image src={swapArrowBlack} alt={swapArrowBlack}
                               className="mr-3"/>
                        <span
                            className="text-whiteColor sm:text-[32px] text-4xl font-semibold sm:leading-[34.82px] leading-10">
										{countTokensCurrent ? ethers.utils.formatUnits(countTokensCurrent, 0) : 0}
                                    </span>

                    </div>
                    {_balanceOfBonuses > 0 &&
                    <p className='text-amber-300'>
                        ({ethers.utils.formatUnits(_balanceOfBonuses, 0)})
                    </p>
                    }
                </div>
                <div className="flex flex-col">
                    <p className="text-blueColor text-sm leading-4 mb-2">Your BNB balance</p>
                    <div className="flex items-center">
                        <Image src={bnbLogo} className="mr-3" alt={bnbLogo}/>
                        <span
                            className="text-whiteColor sm:text-[32px] text-4xl font-semibold sm:leading-[34.82px] leading-10">
                                        {
                                            balance ? parseFloat(ethers.utils.formatEther(balance)).toFixed(3) : 0
                                        }
                                        </span>
                    </div>
                </div>
            </div>

            <Image src={walletPic} className="tablet:hidden relative"
                   alt={walletPic}/>
            <Image src={walletPicMob} className="w-[115px] h-[185px] tablet:block hidden relative left-3"
                   alt={walletPicMob}/>

        </div>
    )
}