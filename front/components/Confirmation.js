import {Modal} from "./Modal";
import Image from "next/image";
import cross from "../assets/images/cross-black.svg";
import arrowLight from "../assets/images/arrow-light.svg";
import Link from "next/link";


export function Confirmation({setConfirmationComplete, setTransactionComplete, hash}) {
    const confirm = async () => {
        const emailInput = document.querySelector('input[name="email"]');
        const termsCheckbox = document.querySelector('input[name="checkbox"][data-goal="terms"]');
        const statementCheckbox = document.querySelector('input[name="checkbox"][data-goal="statement"]');

        if (!emailInput.value || !isValidEmail(emailInput.value)) {
            alert('error valid email')
            return;
        }
        if (!termsCheckbox.checked || !statementCheckbox.checked) {
          alert('select checkboxes')
            return;
        }
		let email = emailInput.value

        try {
            const requestData = { email,  hash};
             await fetch('/api/sendMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });


            close()
        } catch (error) {
            console.error(error);
            alert(error)
        }
    };

    close = () => {
        setConfirmationComplete(true);
        setTransactionComplete(false)
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }



    return (
        <Modal>
            <div className="fixed top-[50%] left-[50%] rounded-md translate-x-[-50%] translate-y-[-50%] flex flex-col justify-between items-center bg-textColor sm:max-w-[350px] max-w-[485px] px-[45px] py-[50px] z-10">
                <Image src={cross} className="absolute z-10 top-[22px] sx:right-[30px] right-[22px] cursor-pointer"
                       onClick={()=>close()}
                       alt={cross} />
                <div className="flex flex-col justify-between items-center gap-[30px]">
                    <p className="text-3xl font-medium text-center">Confirm your email</p>
                    <p className="text-base font-normal text-center max-w-[320px]">Enter your email below to receive all details about this transaction.</p>
                    <div className="bg-gradient-to-r from-[#33EFF1] to-[#198498] w-full rounded-[6px] p-[1px]">
                        <input name="email" type="email"
                               placeholder="Enter your email" className="w-full outline-0 rounded-[6px] px-[22px] py-4" />
                    </div>

                    <div className="flex flex-col justify-between items-center gap-[10px] max-w-[320px] w-full">
                        <div className="flex justify-between items-start">
                            <input name="checkbox" data-goal="terms" type="checkbox" className="w-5 h-5 rounded-[6px] mr-3"/>
                            <span className="text-sm font-normal leading-[18px]">Read and accept <span className="font-bold">Terms of Use </span>and <span className="font-bold">Privacy Policy</span></span>
                        </div>
                        <div className="flex justify-between items-start">
                            <input name="checkbox" data-goal="statement" type="checkbox" className="w-5 h-5 rounded-[6px] mr-3"/>
                            <span className="text-sm font-normal leading-[18px]">Submit the <span className="font-bold">Buyer's Statement </span>as my official declaration</span>
                        </div>
                    </div>

                    <Link href=""
                          onClick={confirm}
                          className="group mx-auto flex gap-[13px] bg-primaryBgColor items-center justify-between rounded-md md:min-w-[293px] max-h-[60px] w-full px-[17px] py-[17px]">
                        <span className="text-textColor text-lg">
                            Confirm
                        </span>
                        <Image src={arrowLight} className="w-[23px] h-[23px] ml-[90px] group-hover:rotate-45 transition duration-300 ease-in" alt={''}/>
                    </Link>

                </div>
            </div>
        </Modal>
    )
}