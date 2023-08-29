import Image from "next/image";
import lightningBlue from "../../assets/images/lightning-blue.svg";
import React from "react";


export function BNXTtoBNB({rate}) {

    return (
        <div
            className="bg-gradient-to-r from-[#34C4E1] via-[#5B86F8] to-[#7165ED] w-full rounded-[49px] p-[1px] mb-[26px] ">
            <div
                className="bg-white p-2 flex justify-center gap-3 items-center rounded-[49px]  ">
                <Image src={lightningBlue} className="" alt={lightningBlue}/>
                <p className="text-blackColor text-base leading-[17.41px] font-medium">1
                    BNXT <span
                        className="text-blackColor text-base leading-[17.41px] font-light">($1.00)</span> = {parseFloat(1 / (rate * 1)).toFixed(5)} BNB
                </p>
            </div>
        </div>
    )
}