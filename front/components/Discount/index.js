import React from "react";


export function Discount({countTokensCurrent, inputValue = 0}) {

    return (
        <>{
            inputValue>0 ?
                <div
                    className="flex justify-between items-center text-[#EB5757] mb-[10px]">
                    <p className="sm:text-sm text-base font-normal leading-[17.41px]">Discount</p>
                    <span
                        className="sm:text-sm text-base font-normal leading-[17.41px]">{((inputValue  - countTokensCurrent / 10)/inputValue * 100).toFixed(2)}% ( - ${inputValue  - countTokensCurrent / 10})</span>
                </div>
                :
                <div
                    className="flex justify-between items-center text-[#EB5757] mb-[10px]">
                    <p className="sm:text-sm text-base font-normal leading-[17.41px]">Discount</p>
                    <span
                      className="sm:text-sm text-base font-normal leading-[17.41px]">90% ( - ${countTokensCurrent  - countTokensCurrent / 10})</span>
                </div>
        }
        </>

    )
}