import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/images/logo-footer.svg";
import arrowDark from "../../assets/images/arrow-dark.svg";
import arrowLight from "../../assets/images/arrow-light.svg";



export function Footer() {
    const currentOrigin = 'https://bnxt.network/'


    return (
        <div className="bg-blackColor sm:pt-[65px] pt-[4.813rem] px-[17px] smn:px-[104px] mb-[-50px] relative overflow-hidden">

            <div className="max-w-[1526px] mx-auto text-whiteColor "
                 >

                <div className="grid sm:grid-cols-1 grid-cols-2 justify-between items-center sm:gap-0 gap-[67px] border-b-[1px] border-solid border-darkBlueColor sm:pb-[27px] pb-[42px] sm:px-4 relative"
                     >
                    <Link  href={currentOrigin + 'home'} >
                        <Image src={logo} className="sm:max-w-[230px] sm:mx-auto sm:mb-9 mdd:row-start-1 mdd:row-end-2 mdd:col-start-1 mdd:col-end-3 mdd:mx-auto" alt={''}/>
                    </Link>

                        <div className="flex sm:flex-col items-center justify-end md:row-start-4 mdd:row-end-5 mdd:col-start-1 mdd:col-end-3 mdd:justify-center"

                        >
                            <p className="md:mb-4 sm:mr-0 mr-[40px] text-lg">Interested in working with us?</p>
                            <Link href="mailto:info@bnxt.com" className="group grid grid-cols-2 gap-[13px] bg-blueColor hover:bg-blueHoverColor items-center justify-between rounded-md max-w-[282px] max-h-[60px] w-full px-[17px] pt-[17px] pb-[20px]">
                                <span className="text-darkBlueColor text-lg">Get In Touch</span>
                                <Image src={arrowDark} className="w-[23px] h-[23px] ml-[90px] group-hover:rotate-45 transition duration-300 ease-in" alt={''}/>
                            </Link>
                        </div>

                    <div className="self-start sm:mb-[60px] max-w-[310px] w-full md:grid md:mx-auto md:row-start-2 md:row-end-3 md:col-start-1 md:col-end-3 md:text-center">
                        <div className="mb-[30px]">
                            <p className="sm:text-lg text-base text-whiteColor">BE NEXT SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ</p>
                        </div>
                        <div className="mb-[30px]">
                            <p className="sm:text-lg text-base text-whiteColor">ul. Romana Dmowskiego 3/9</p>
                            <p className="sm:text-lg text-base text-whiteColor">50-203 Wrocław</p>
                        </div>
                        <p className="text-lg">NIP 898-229-2125</p>
                    </div>

                    <div className="flex sm:flex-col sm:mb-14 sm:items-center justify-end min-h-[273px] sm:gap-[24px] gap-[40px] md:row-start-3 md:row-end-4 md:col-start-1 md:col-end-3 md:justify-center">
                            <div className="min-w-[145px]">
                                <ul className="sm:text-center text-left">
                                    <p className="sm:mb-7 mb-10 text-xl leading-5 font-bold">Project</p>
                                    <li className="mb-[20px] text-lg leading-5 font-normal hover:text-blueColor transition duration-300 ease-in"><Link href="/onboarding">How to buy</Link></li>
                                    <li className="mb-[20px] text-lg leading-5 font-normal hover:text-blueColor transition duration-300 ease-in"><Link href="https://bnxt.network/home/#use-cases">Use cases</Link></li>
                                    <li className="mb-[20px] text-lg leading-5 font-normal hover:text-blueColor transition duration-300 ease-in"><Link href="https://bnxt.network/home/#tokenomics">Tokenomics</Link></li>
                                    <li className="mb-[20px] text-lg leading-5 font-normal hover:text-blueColor transition duration-300 ease-in"><Link href="https://bnxt.network/home/#roadmap">Roadmap</Link></li>
                                    <li className="group mb-[20px] text-lg leading-5 hover:text-blueColor transition duration-300 ease-in"><Link href="https://bnxt.network/home/">Whitepaper</Link>
                                        <svg src={arrowLight} className="inline-block ml-5 cursor-pointer group-hover:rotate-45 fill-white group-hover:fill-blueColor transition duration-300 ease-in" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.29231 12L0 10.7077L8.86154 1.84615H0.923077V0H12V11.0769H10.1538V3.13846L1.29231 12Z"/>
                                        </svg>
                                    </li>
                                </ul>
                            </div>

                            <div className="min-w-[131px]">
                                <ul className="sm:text-center text-left block">
                                    <p className="sm:mb-7 mb-10 text-xl leading-5 font-bold">Community</p>
                                    <li className="group mb-[20px] text-lg leading-5 font-normal hover:text-blueColor transition duration-300 ease-in"><Link href="https://twitter.com/bNXT_network?s=20">Twitter</Link>
                                        <svg src={arrowLight} className="inline-block ml-5 cursor-pointer group-hover:rotate-45 fill-white group-hover:fill-blueColor transition duration-300 ease-in" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.29231 12L0 10.7077L8.86154 1.84615H0.923077V0H12V11.0769H10.1538V3.13846L1.29231 12Z"/>
                                        </svg>
                                    </li>
                                    <li className="group mb-[20px] text-lg leading-5 font-normal hover:text-blueColor transition duration-300 ease-in"><Link href="https://www.instagram.com/bnxt_network/">Instagram</Link>
                                        <svg src={arrowLight} className="inline-block ml-5 cursor-pointer group-hover:rotate-45 fill-white group-hover:fill-blueColor transition duration-300 ease-in" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.29231 12L0 10.7077L8.86154 1.84615H0.923077V0H12V11.0769H10.1538V3.13846L1.29231 12Z"/>
                                        </svg>
                                    </li>
                                    <li className="group mb-[20px] text-lg leading-5 font-normal hover:text-blueColor transition duration-300 ease-in"><Link href="https://t.me/+JZIHf2hPMIhkZWM0">Telegram</Link>
                                        <svg src={arrowLight} className="inline-block ml-5 cursor-pointer group-hover:rotate-45 fill-white group-hover:fill-blueColor transition duration-300 ease-in" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.29231 12L0 10.7077L8.86154 1.84615H0.923077V0H12V11.0769H10.1538V3.13846L1.29231 12Z"/>
                                        </svg>
                                    </li>
                                </ul>
                            </div>

                            <div className="min-w-[138px]">
                                <ul className="sm:text-center text-left">
                                    <p className="sm:mb-7 mb-10 text-xl leading-5 font-bold">About bNXT</p>
                                    <li className="mb-[20px] text-lg leading-5 font-normal hover:text-blueColor transition duration-300 ease-in"><Link href="https://bnxt.network/home/#about">About</Link></li>
                                    <li className="group mb-[20px] text-lg leading-5 font-normal hover:text-blueColor transition duration-300 ease-in"><Link href="https://bnxt.network/frequently-asked-questions/">FAQ</Link>
                                        <svg src={arrowLight} className="inline-block ml-5 cursor-pointer group-hover:rotate-45 fill-white group-hover:fill-blueColor transition duration-300 ease-in" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.29231 12L0 10.7077L8.86154 1.84615H0.923077V0H12V11.0769H10.1538V3.13846L1.29231 12Z"/>
                                        </svg>
                                    </li>
                                    <li className="group mb-[20px] text-lg leading-5 font-normal hover:text-blueColor transition duration-300 ease-in"><Link href="mailto:info@bnxt.com">Contact us</Link>
                                        <svg src={arrowLight} className="inline-block ml-5 cursor-pointer group-hover:rotate-45 fill-white group-hover:fill-blueColor transition duration-300 ease-in" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.29231 12L0 10.7077L8.86154 1.84615H0.923077V0H12V11.0769H10.1538V3.13846L1.29231 12Z"/>
                                        </svg>
                                    </li>
                                </ul>
                            </div>
                        </div>



                </div>

                <div className="flex sm:flex-col-reverse sm:items-center justify-between sm:pb-9 sm:pt-0 pt-[42px] pb-[38px]">
                    <div>
                        <p className="text-base leading-4 font-normal text-whiteColor sm:justify-center">© 2023 bNXT. All rights reserved.</p>
                    </div>

                    <div className="flex gap-[40px] sm:py-[22px] sm:w-full sm:justify-between px-[23px]">
                        <Link href="https://bnxt.network/terms-conditions/" className="text-base leading-4 font-normal text-whiteColor hover:text-blueColor transition duration-300 ease-in">Terms & Conditions</Link>
                        <Link href="https://bnxt.network/privacy-policy/" className="text-base leading-4 font-normal text-whiteColor hover:text-blueColor transition duration-300 ease-in">Privacy & Policy</Link>
                    </div>

                </div>

            </div>
        </div>
    )
}

