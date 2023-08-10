import logo from "../assets/images/logo-footer.svg";
import arrowDark from "../assets/images/arrow-dark.svg";
import arrowLight from "../assets/images/arrow-light.svg";
import Image from "next/image";
import Link from "next/link";

export function Footer() {

    return (
        <div className="bg-primaryBgColor sm:pt-[65px] pt-[4.813rem] sm:px-[35px] lg:px-[105px] px-[197px] mb-[-50px] relative overflow-hidden">

            <div className="max-w-[1920px] mx-auto text-textColor "
                 >

                <div className="grid sm:grid-cols-1 grid-cols-2 justify-between items-center sm:gap-0 gap-[67px] sm:border-b-0 border-b-[1px] border-solid border-[#0B2D44] sm:pb-[27px] pb-[42px] relative"
                     >
                        <Image src={logo} className="sm:max-w-[230px] sm:mx-auto sm:mb-9 md:row-start-1 md:row-end-2 md:col-start-1 md:col-end-3 md:mx-auto" alt={''}/>
                        <div className="flex sm:flex-col items-center justify-end md:row-start-4 md:row-end-5 md:col-start-1 md:col-end-3 md:justify-center"

                        >
                            <p className="md:mb-4 sm:mr-0 mr-[40px] text-lg">Interested in working with us?</p>
                            <Link href="" className="group grid grid-cols-2 gap-[13px] bg-buttonBgColor hover:bg-buttonHoverBgColor items-center justify-between rounded-md max-w-[282px] max-h-[60px] w-full px-[17px] pt-[17px] pb-[20px]">
                                <span className="text-secondaryBgColor text-lg">Get In Touch</span>
                                <Image src={arrowDark} className="w-[23px] h-[23px] ml-[90px] group-hover:rotate-45 transition duration-300 ease-in" alt={''}/>
                            </Link>
                        </div>

                        <div className="self-start sm:mb-[60px] max-w-[310px] w-full md:grid md:mx-auto md:row-start-2 md:row-end-3 md:col-start-1 md:col-end-3 md:text-center">
                            <div className="text-lg font-normal leading-[26px] text-textColor mb-[30px]">
                                <p>+380 4657-4883-32</p>
                            </div>
                            <div className="text-lg font-normal leading-[26px] text-textColor max-w-[300px]">
                                <p className="mb-[30px]">info@bnxt.com</p>
                                <p>Feliksa Nowowiejskiego 55, 61-734 Poznań, Poland</p>
                            </div>
                        </div>

                        <div className="flex sm:flex-col sm:mb-14 sm:items-center justify-end min-h-[273px] sm:gap-[50px] gap-[78px] md:row-start-3 md:row-end-4 md:col-start-1 md:col-end-3 md:justify-center">
                            <div>
                                <ul className="sm:text-center text-left">
                                    <p className="sm:mb-7 mb-10 text-xl leading-5 font-bold">Project</p>
                                    <li className="mb-[20px] text-lg leading-5 font-normal hover:text-buttonBgColor transition duration-300 ease-in"><Link href="/onboarding">How to buy</Link></li>
                                    <li className="mb-[20px] text-lg leading-5 font-normal hover:text-buttonBgColor transition duration-300 ease-in"><Link href="https://bnxt.network/home/#use-cases">Use cases</Link></li>
                                    <li className="mb-[20px] text-lg leading-5 font-normal hover:text-buttonBgColor transition duration-300 ease-in"><Link href="https://bnxt.network/home/#tokenomics">Tokenomics</Link></li>
                                    <li className="mb-[20px] text-lg leading-5 font-normal hover:text-buttonBgColor transition duration-300 ease-in"><Link href="https://bnxt.network/home/#roadmap">Roadmap</Link></li>
                                    <li className="group text-lg leading-5 hover:text-buttonBgColor transition duration-300 ease-in"><Link href="https://bnxt.network/home/">Whitepaper</Link>
                                        <svg src={arrowLight} className="inline-block ml-5 cursor-pointer group-hover:rotate-45 fill-white group-hover:fill-buttonBgColor transition duration-300 ease-in" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.29231 12L0 10.7077L8.86154 1.84615H0.923077V0H12V11.0769H10.1538V3.13846L1.29231 12Z"/>
                                        </svg>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <ul className="sm:text-center text-left sm:hidden block">
                                    <p className="sm:mb-7 mb-10 text-xl leading-5 font-bold">Community</p>
                                    <li className="group mb-[20px] text-lg leading-5 font-normal hover:text-buttonBgColor transition duration-300 ease-in"><Link href="https://twitter.com/bNXT_network?s=20">Twitter</Link>
                                        <svg src={arrowLight} className="inline-block ml-5 cursor-pointer group-hover:rotate-45 fill-white group-hover:fill-buttonBgColor transition duration-300 ease-in" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.29231 12L0 10.7077L8.86154 1.84615H0.923077V0H12V11.0769H10.1538V3.13846L1.29231 12Z"/>
                                        </svg>
                                    </li>
                                    <li className="group mb-[20px] text-lg leading-5 font-normal hover:text-buttonBgColor transition duration-300 ease-in"><Link href="https://www.instagram.com/bnxt_network/">Instagram</Link>
                                        <svg src={arrowLight} className="inline-block ml-5 cursor-pointer group-hover:rotate-45 fill-white group-hover:fill-buttonBgColor transition duration-300 ease-in" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.29231 12L0 10.7077L8.86154 1.84615H0.923077V0H12V11.0769H10.1538V3.13846L1.29231 12Z"/>
                                        </svg>
                                    </li>
                                    <li className="group mb-[20px] text-lg leading-5 font-normal hover:text-buttonBgColor transition duration-300 ease-in"><Link href="https://t.me/+JZIHf2hPMIhkZWM0">Telegram</Link>
                                        <svg src={arrowLight} className="inline-block ml-5 cursor-pointer group-hover:rotate-45 fill-white group-hover:fill-buttonBgColor transition duration-300 ease-in" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.29231 12L0 10.7077L8.86154 1.84615H0.923077V0H12V11.0769H10.1538V3.13846L1.29231 12Z"/>
                                        </svg>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <ul className="sm:text-center text-left">
                                    <p className="sm:mb-7 mb-10 text-xl leading-5 font-bold">About bNXT</p>
                                    <li className="mb-[20px] text-lg leading-5 font-normal hover:text-buttonBgColor transition duration-300 ease-in"><Link href="https://bnxt.network/home/#about">About</Link></li>
                                    <li className="group mb-[20px] text-lg leading-5 font-normal hover:text-buttonBgColor transition duration-300 ease-in"><Link href="https://bnxt.network/frequently-asked-questions/">FAQ</Link>
                                        <svg src={arrowLight} className="inline-block ml-5 cursor-pointer group-hover:rotate-45 fill-white group-hover:fill-buttonBgColor transition duration-300 ease-in" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.29231 12L0 10.7077L8.86154 1.84615H0.923077V0H12V11.0769H10.1538V3.13846L1.29231 12Z"/>
                                        </svg>
                                    </li>
                                    <li className="group mb-[20px] text-lg leading-5 font-normal hover:text-buttonBgColor transition duration-300 ease-in"><Link href="https://bnxt.network/home/">Contact us</Link>
                                        <svg src={arrowLight} className="inline-block ml-5 cursor-pointer group-hover:rotate-45 fill-white group-hover:fill-buttonBgColor transition duration-300 ease-in" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.29231 12L0 10.7077L8.86154 1.84615H0.923077V0H12V11.0769H10.1538V3.13846L1.29231 12Z"/>
                                        </svg>
                                    </li>
                                </ul>
                            </div>
                        </div>



                </div>

                <div className="flex sm:flex-col-reverse sm:items-center justify-between sm:pb-9 sm:pt-0 pt-[42px] pb-[38px]">
                    <div>
                        <p className="text-base leading-4 font-normal text-textColor sm:justify-center">© 2023 bNXT. All rights reserved.</p>
                    </div>

                    <div className="flex gap-[40px] sm:py-[22px] sm:w-full sm:justify-between">
                        <Link href="https://bnxt.network/terms-conditions/" className="text-base leading-4 font-normal text-textColor hover:text-buttonBgColor transition duration-300 ease-in">Terms & Conditions</Link>
                        <Link href="https://bnxt.network/privacy-policy/" className="text-base leading-4 font-normal text-textColor hover:text-buttonBgColor transition duration-300 ease-in">Privacy & Policy</Link>
                    </div>

                </div>

            </div>
        </div>
    )
}

