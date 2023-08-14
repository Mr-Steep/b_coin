import {Modal} from "./Modal";
import Image from "next/image";
import cross from "../assets/images/cross-black.svg";
import arrowLight from "../assets/images/arrow-light.svg";
import Link from "next/link";
import React, {useState} from "react";
import loader from "../assets/images/loader.svg";
import alert_circle from "../assets/images/alert-circle.svg";


export function Confirmation({setConfirmationComplete, setTransactionComplete, hash}) {

    const [isLoading, setIsLoading] = useState(false);
    const [emailError, setEmailError] = useState(false)
    const [checkboxError, setCheckboxError] = useState(false)

    const [isChecked, setIsChecked] = useState(false);
    const [isCheckedSubmit, setIsCheckedSubmit] = useState(false);
    const confirm = async () => {
        setIsLoading(true)
        const emailInput = document.querySelector('input[name="email"]');
        const termsCheckbox = document.querySelector('input[name="checkbox"][data-goal="terms"]');
        const statementCheckbox = document.querySelector('input[name="checkbox"][data-goal="statement"]');

        if (!emailInput.value || !isValidEmail(emailInput.value)) {
            // alert('error valid email')
            setIsLoading(false)
            setEmailError(true)
            return;
        } else {
            setEmailError(false)
        }
        if (!termsCheckbox.checked || !statementCheckbox.checked) {
          // alert('select checkboxes')
            setIsLoading(false)
            setCheckboxError(true)
            return;
        } else {
            setCheckboxError(false)
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
            setIsLoading(false)
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
            <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col justify-between items-center bg-textColor sx:max-w-[360px] sm:max-w-[400px] max-w-[485px] w-full rounded-md py-[50px] z-10">
                <Image src={cross} className="absolute z-10 top-[22px] sx:right-[30px] right-[22px] cursor-pointer"
                       onClick={()=>close()}
                       alt={cross} />
                <div className="flex flex-col justify-between items-center gap-[30px]">
                    <p className="text-3xl font-medium text-center text-[#000000]">Confirm your email</p>
                    <p className="text-base font-normal text-center max-w-[320px] text-[#414042]">Enter your email below to receive all details about this transaction.</p>
                    <div className={" sm:w-[320px] w-[395px] rounded-[6px] p-[1px] "
                    + (emailError || checkboxError ? "bg-errorColor" : "bg-gradient-to-r from-[#33EFF1] to-[#198498]")
                    }>
                        <input name="email" type="email"
                               placeholder="Enter your email" className="w-full outline-0 rounded-[6px] px-[22px] py-4 bg-[#ffffff]" />
                    </div>

                    {emailError &&
                    <div className="flex justify-between items-center mt-[-14px]">
                        <Image src={alert_circle} className="mr-3" alt={alert_circle} />
                        <span className="text-errorColor text-sm font-normal leading-[15.23px]">The field cannot be empty. Please enter your email </span>
                        </div>
                    }

                    <div className="flex flex-col justify-between items-center gap-[10px] max-w-[320px] w-full">
                        <div className="flex justify-between items-start  bg-white">
                            <input name="checkbox" onClick={() => setIsChecked(!isChecked)} data-goal="terms" type="checkbox" className="h-[20px] w-[20px] mr-3 opacity-0 h-0 absolute z-[1]"/>
                            <span className={"flex text-sm font-normal leading-[18px] relative z-0 text-[#414042] before:content-[''] before:inline-block before:w-[20px] before:h-[20px] before:border before:border-solid before:border-[#D0D5DD] before:rounded-[6px] before:mr-[12px] before:min-w-[20px] "
                            + (isChecked ? "before:border-[#000000] after:content-[''] after:absolute after:left-[7px] after:top-[3px] after:rotate-45 after:h-[11px] after:w-[6px] after:border-b-[2px] after:border-[#000000] after:border-r-[2px] " : '') }>Read and accept
                                <span className="font-bold text-[#000000] contents">Terms of Use </span>and <span className="contents font-bold text-[#000000]">Privacy Policy</span>
                            </span>
                        </div>
                        <div className="flex justify-between items-start  bg-white">
                            <input name="checkbox" onClick={() => setIsCheckedSubmit(!isCheckedSubmit)}  data-goal="statement" type="checkbox" className="h-[20px] w-[20px] mr-3 opacity-0 h-0 absolute z-[1]"/>
                            <span className={"flex text-sm font-normal leading-[18px] relative z-0 text-[#414042] before:content-[''] before:inline-block before:w-[20px] before:h-[20px] before:border before:border-solid before:border-[#D0D5DD] before:rounded-[6px] before:mr-[12px] before:min-w-[20px] "
                            + (isCheckedSubmit ? "before:border-[#000000] after:content-[''] after:absolute after:left-[7px] after:top-[3px] after:rotate-45 after:h-[11px] after:w-[6px] after:border-b-[2px] after:border-[#000000] after:border-r-[2px] " : '') }>Submit the
                                <span className="font-bold text-[#000000] contents">Buyer's Statement </span>as my official declaration</span>
                        </div>
                    </div>

                    {checkboxError &&
                    <div className="flex justify-between items-center">
                        <Image src={alert_circle} className="mr-3" alt={alert_circle} />
                        <span className="text-errorColor text-sm font-normal leading-[15.23px]">Checkboxes are required </span>
                    </div>
                    }

                    <Link href=""
                          onClick={confirm}
                          className={"group mx-auto flex gap-[20px] bg-primaryBgColor items-center justify-between rounded-md sm:w-[320px] max-h-[60px] w-full px-[17px] py-[17px] " + (isLoading && " opacity-30 pointer-events-none ")}>
                        <span className="text-textColor text-lg flex justify-center gap-[10px] items-center">
                            Confirm
                            {isLoading &&
                            <Image src={loader} className="w-[30px] h-[30px]" alt={'loader'}/>
                            }
                        </span>
                        <Image src={arrowLight} className="w-[23px] h-[23px] ml-[90px] group-hover:rotate-45 transition duration-300 ease-in" alt={''}/>
                    </Link>

                </div>
            </div>
        </Modal>
    )
}