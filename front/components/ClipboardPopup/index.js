import check from "../../assets/images/check-circle.svg"
import cross from "../../assets/images/cross-black.svg"
import Image from "next/image";
import {Modal} from "../Modal";

export function ClipboardPopup({tokenModal, setPopupVisible}) {

    return (
        <Modal tokenModal={tokenModal} setPopupVisible={setPopupVisible}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-between items-center bg-whiteColor max-w-[328px] w-full h-[65px] rounded-md pr-[22px] pl-[27px] py-[22px] z-30">
                <div className="flex justify-between items-center">
                    <Image src={check} alt={check} />
                    <span className="text-lg font-normal leading-5 ml-3">Copied to clipboard</span>
                </div>
                <Image src={cross} className="cursor-pointer" onClick={() => setPopupVisible(false)} alt={cross} />
            </div>
        </Modal>
    )
}
