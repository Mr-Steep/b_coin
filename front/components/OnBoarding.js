 import logo from "../assets/images/logo-white.svg";
import burger from "../assets/images/burger.svg";
import mockVideo from "../assets/images/mock-video.png";
import award from "../assets/images/award.png";
import arrowLight from "../assets/images/arrow-light.svg";
import Image from "next/image";
import Link from "next/link";
import {Layout} from "./Layout";
import {Footer} from "@/components/Footer";
import { useRouter } from 'next/router';
 import headerProject from "../assets/images/project-header.png";

export function OnBoarding() {

    const router = useRouter()

    return (
        <Layout>
            <div className="w-full relative overflow-hidden">
                <div className="h-[34.4vh] md:h-[133px] h-[380px] "

                     style={{
                         backgroundImage: `url(${headerProject.src})`,
                         backgroundRepeat: 'no-repeat',
                         backgroundSize: 'cover'
                     }}
                >
                    <Link href="https://dev.bnxt.network/home/">
                        <Image className="md: pt-[23px] md:ml-4 ml-[119px] md:w-[138px] w-[188px] mb-[132px]" src={logo} alt={logo}
                               height="32px"/>
                    </Link>
                    <p className="md:text-[50px] text-[60px] text-textColor md:leading-[54.4px] leading-[65.28px] font-bold md:mb-4 ml-[106px] mb-[115px] ">
                        How to buy bNXT
                    </p>
                </div>

                <div className="md:px-4 px-[111px] pt-[35px] bg-textColor">

                    <div className="max-w-[1920px] mx-auto relative">


                        <div className="flex flex-col w-full">


                            <p className="content-start text-lg text-primaryBgColor max-w-[608px] md:mb-[55px] mt-[50px] mb-[92px]">Worem ipsum dolor sit amet, consectetur
                                adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
                                fringilla. </p>

                            <div className="flex flex-col text-primaryBgColor mb-[114px]">

                                <div className="flex md:flex-col justify-between items-center mb-[90px]">
                                    <div className="max-w-[480px] md:mr-0 mr-[150px] md:mb-10">
                                        <div className="flex">
                                            <div className="bg-primaryBgColor w-[50px] h-[31px] mr-[26px]"></div>
                                            <div>
                                                <p className="md:text-2xl text-3xl font-bold mb-[14px]">1. Get MetaMask wallet</p>

                                                <p className="text-lg mb-8">Download & Install the MetaMask wallet extension on a
                                                    desktop browser, such as Chrome, to store and manage bNXT. <Link href=""
                                                                                                                     className="font-semibold">Here&apos;s
                                                        a step-by-step guide on how to install the MetaMask extension and sign up
                                                        for an account.</Link></p>

                                                <p className="text-lg">Looking to save big on cryptocurrency purchases?
                                                    bNXT offers a streamlined experience with effortless purchases and secure
                                                    transactions.</p>
                                            </div>


                                        </div>
                                    </div>
                                    <Image src={mockVideo} className="mdd:w-[343px] lg:w-[594px] w-[744px] mdd:h-[134px] lg:h-[230px] h-[288px]" alt="mock-video"/>
                                </div>

                                <div className="flex md:flex-col-reverse justify-between items-center mb-[90px]">
                                    <Image src={mockVideo} className="mdd:w-[343px] lg:w-[594px] w-[744px] mdd:h-[134px] lg:h-[230px] h-[288px]" alt="mock-video"/>
                                    <div className="max-w-[480px] md:ml-0 ml-[104px] md:mb-10">
                                        <div className="flex">
                                            <div className="bg-primaryBgColor w-[50px] h-[31px] mr-[26px]"></div>
                                            <div>
                                                <p className="md:text-2xl text-3xl font-bold mb-[14px]">2. Buy BNB</p>
                                                <p className="text-lg mb-8">You can buy BNB within MetaMask via Wyre or CoinSwitch
                                                    by clicking the buy button. If you are not familiar with BNB currency, don&apos;t
                                                    worry! We&apos;ve got you covered. <Link href=""
                                                                                             className="font-semibold hover:underline">Here
                                                        are step-by-step instructions on how to buy BNB.</Link></p>

                                                <p className="text-lg">Unlock Big Savings with bNXT: Streamlined Cryptocurrency
                                                    Purchases and Enhanced Security.</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="flex md:flex-col justify-between items-center mb-[90px]">
                                    <div className="max-w-[480px] md:mr-0 mr-[104px] md:mb-10">
                                        <div className="flex">
                                            <div className="bg-primaryBgColor w-[70px] h-[31px] mr-[26px]"></div>
                                            <div>
                                                <p className="md:text-2xl text-3xl font-bold mb-[14px]">3. Swap for bNXT</p>
                                                <p className="text-lg">Connect your MetaMask wallet and trade some of your BNB for
                                                    bNXT. If you&aposre unfamiliar with changing currencies and would like to store all
                                                    your information in MetaMask, we&apos;ve got you covered! <Link href=""
                                                                                                                    className="font-semibold hover:underline">Check
                                                        out our comprehensive guide on how to change currencies and safely save all
                                                        your data in MetaMask.</Link></p>
                                            </div>
                                        </div>
                                    </div>
                                    <Image src={mockVideo} className="mdd:w-[343px] lg:w-[594px] w-[744px] mdd:h-[134px] lg:h-[230px] h-[288px]" alt="mock-video"/>
                                </div>

                                <div className="flex md:flex-col-reverse justify-between items-center md:pl-[35px]">
                                    <Image src={mockVideo} className="mdd:w-[343px] lg:w-[594px] w-[744px] mdd:h-[134px] lg:h-[230px] h-[288px]" alt="mock-video"/>
                                    <div className="max-w-[480px] md:ml-0 ml-[104px] md:mb-10">
                                        <p className="md:text-2xl text-3xl font-bold mb-[14px]">Get Reward!</p>
                                        <p className="text-lg mb-8">Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                                            amet sint. Velit officia consequat duis enim velit mollit. Exercitation <Link href=""
                                                                                                                          className="font-semibold hover:underline">veniam consequat
                                                sunt nostrud amet.</Link></p>

                                        <p className="text-lg">Looking to save big on cryptocurrency purchases?
                                            bNXT offers a streamlined experience with effortless purchases and secure transactions.
                                        </p>
                                    </div>
                                </div>

                            </div>


                            <button className="group mx-auto grid grid-cols-2 gap-[13px] bg-primaryBgColor items-center justify-between rounded-md max-w-[282px] max-h-[60px] w-full px-[17px] pt-[17px] pb-[20px] md:mb-[70px] mb-[135px]"
                                    onClick={() => router.push('/')}>
                                <span className="text-textColor text-lg">Let’s Start!</span>
                                <Image src={arrowLight} className="w-[23px] h-[23px] ml-[90px] group-hover:rotate-45 transition duration-300 ease-in" alt={''}/>
                            </button>
                        </div>

                    </div>
                </div>

            </div>

            <Footer/>
        </Layout>
    )
}
