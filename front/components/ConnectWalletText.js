import Image from "next/image";
import metamask from "../assets/images/metamask.png";
import React from "react";


export function ConnectWalletText() {

    return (
        <div
            className="flex flex-col justify-between items-center gap-4 max-w-[320px] mdd:mt-[27px] mt-auto mdd:mb-[36px] mb-auto">
            <Image src={metamask} className=" lg:w-[88px]  lg:h-[88px]" alt={metamask}/>
            <p className="text-3xl text-primaryBgColor font-medium leading-[32.64px] mdd:mt-[30px] mt-10">Connect
                your wallet</p>
            <p className="text-base text-primaryBgColor font-normal leading-[26px] text-center">Amet
                minim mollit
                non
                deserunt ullamco est sit aliqua dolor do amet sint.</p>
        </div>
    )
}