import Image from "next/image";
import token1 from "../../assets/images/token-1.svg"
import token2 from "../../assets/images/token-2.svg"
import token3 from "../../assets/images/token-3.svg"
import smart from "../../assets/images/smart.svg"
import {useState, useEffect} from "react";

import {ClipboardPopup} from "../ClipboardPopup";

export function Token() {

    const [closed, setOpened] = useState(true);

    const [popupVisible, setPopupVisible] = useState(false)

    const [tokenModal, setTokenModal] = useState(true)

    const openToken = () => {
        setOpened(prev => !prev)
    }

    const copyToken = () => {
        navigator.clipboard.writeText(value)
        setPopupVisible(true)
    }



    const value = '0x475bfaa1848591ae0e6ab69600f48d828f61a80e'



    return (
        <div className={" bg-darkBlueColor flex justify-between items-center w-max-[497px] h-[214px] rounded-l-[30px] fixed bottom-[130px] pl-[25px] pr-[20.67px] pt-6 pb-5 right-[-430px] transition duration-500 ease-in "
             + (closed ? 'translate-x-0' : 'sm:translate-x-[-290px] translate-x-[-420px]'
            )}>
            <div className="group flex flex-col justify-between items-center w-[26px] h-full cursor-pointer mr-7" onClick={openToken}>
                <Image src={token1} alt={token1}/>
                <Image src={token2} alt={token2}/>
                <Image src={token3} className={"transition duration-300 ease-in "
                + (closed ? 'rotate-0' : 'rotate-180')} alt={token3}/>
            </div>
            <div className="flex flex-col justify-between items-start h-full">
                <p className="text-whiteColor text-xl leading-5 mb-4">Token info</p>
                <div className="mb-[10px]">
                    <p className="text-blueColor text-base leading-4 mb-1">bNXT</p>
                    <p className="text-whiteColor text-sm leading-4">Name</p>
                </div>
                <div className="mb-[10px]">

                    <div className="flex mb-1 transition duration-300 ease-in" onClick={copyToken}>
                        <span className="text-blueColor text-base leading-4 select-none cursor-pointer mr-[11.67px]">{value}</span>
                        <Image src={smart} alt={smart} />
                    </div>

                    <p className="text-whiteColor text-sm leading-4">Smartcontract address</p>

                </div>
                <div>
                    <p className="text-blueColor text-base leading-4 mb-1">0</p>
                    <p className="text-whiteColor text-sm leading-4">Decimals</p>
                </div>
            </div>

            {popupVisible &&
                <ClipboardPopup tokenModal={tokenModal} setPopupVisible={setPopupVisible}/>
            }

        </div>
    )
}
