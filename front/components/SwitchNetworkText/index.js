import Image from "next/image";
import bnbLogo from "../../assets/images/bnb-logo.svg";


export function SwitchNetworkText() {

    return (
        <div
            className="flex flex-col justify-between items-center gap-4 max-w-[320px] mt-[70px] mb-[72px]">
            <Image src={bnbLogo} className="w-[88px] h-[88px]" alt={bnbLogo}/>
            <p className="text-3xl text-blackColor font-medium leading-[32.64px]">Switch
                network</p>
            <p className="text-base text-blackColor font-normal leading-[26px] text-center">Amet
                minim
                mollit non deserunt
                ullamco est sit aliqua dolor do amet sint.</p>
        </div>
    )
}