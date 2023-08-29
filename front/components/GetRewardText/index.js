import React from "react";


export function GetRewardText() {

    return (
        <div
            className="flex flex-col justify-content items-center gap-4 text-blackColor px-[20px] max-w-[275px] mt-auto mb-auto">
            <p className="text-3xl font-medium leading-[32.64px] text-center">Please
                note!</p>
            <p className="text-base font-normal leading-[26px] text-center max-w-[320px] w-full">Your
                current balance is 1000 BNXT.
                You can no longer buy currency.
                Please get your reward!</p>
        </div>
    )
}