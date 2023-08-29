import React from "react";


export function MultiplierField({inputValue}) {

    return (
        <div
            className="flex justify-between items-center bg-[#F2F2F2] w-full rounded-[6px] pr-6 pl-4 py-[10px]">
            <div
                className="appearance-none bg-[#F2F2F2] text-blackColor md:text-3xl text-[30px] sx:text-[24px] outline-0 w-full h-[33px] leading-none font-semibold ">
                {inputValue > 0 ? inputValue : 0}
            </div>
            <span
                className="text-blackColor">${inputValue > 0 ? inputValue : 0}</span>

        </div>
    )
}