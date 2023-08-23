import Image from "next/image";
import gas from "../assets/images/gas-black.svg";
import React from "react";


export function TotalCost({gasPrice, totalCostUSD, rate, fixedValue, active}) {

    return (
        <>
            <div
                className="flex justify-between items-center text-primaryBgColor mb-[10px]">
                <p className="sm:text-sm text-base font-normal leading-[17.41px]">Network
                    fee</p>
                <div
                    className="flex justify-between items-center gap-[8px]">
                    <Image src={gas} alt={''}/>
                    {
                        gasPrice &&
                        <span
                            className="text-base font-normal leading-[17.41px]">{gasPrice} Gwei</span>
                    }
                </div>
            </div>

            <div
                className="flex justify-between items-center text-primaryBgColor ">
                <p className="sm:text-sm text-base font-normal leading-[17.41px]">Total
                    Cost</p>
                {
                    totalCostUSD && active
                        ?
                        <span
                            className="sm:text-sm text-base font-normal leading-[17.41px]"> ~ $ {(totalCostUSD * rate / 10).toFixed(fixedValue)}</span>
                        :
                        <span
                            className="sm:text-sm text-base font-normal leading-[17.41px]"> ~ $ {(totalCostUSD * rate).toFixed(fixedValue)}</span>
                }
            </div>
        </>
    )
}