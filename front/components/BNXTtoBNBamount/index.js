import Image from "next/image";
import swapArrowWhite from "../../assets/images/swap-arrow.svg";
import bnbLogo from "../../assets/images/bnb-logo.svg";
import React from "react";


export function BNXTtoBNBamount({valueBnxt, valueUsd, priceInBnb}) {

    return (
        <div
            className="bg-whiteColor relative flex justify-center items-center border-b-[1px] border-[#F2F2F2] pb-[20px] w-full rounded-md mb-5 mt-[26px]">
            <div className="flex justify-between items-center ">
                <Image src={swapArrowWhite} className="w-[30px] h-[30px] mr-[6px]" alt={swapArrowWhite}/>
                {

                }
                <span className="bg-whiteColor text-blackColor sm:text-sm text-lg font-medium leading-5 ">{valueBnxt} BNXT (${valueUsd}) </span>

                <span className="mr-2 ml-2 sm:mr-1 sm:ml-1"> = </span>
                <Image src={bnbLogo}
                       className="w-[30px] h-[30px] mr-[6px]"
                       alt={bnbLogo}
                />
                <span className="bg-whiteColor text-blackColor sm:text-sm text-lg font-medium leading-5">
                    {priceInBnb} BNB
                </span>
            </div>
        </div>
    )
}