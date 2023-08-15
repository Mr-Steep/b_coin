import Link from "next/link";
import Image from "next/image";
import cross from "../assets/images/cross-white.svg";
import nextArrow from "@/assets/images/next-arrow.svg";
import arrow1 from "@/assets/images/arrow-1.svg";
import arrow2 from "@/assets/images/arrow-2.svg";
import arrow3 from "@/assets/images/arrow-3.svg";
import arrow4 from "@/assets/images/arrow-4.svg";
import arrow6 from "@/assets/images/arrow-6.svg";
import arrow5 from "@/assets/images/arrow-5.svg";
import arrow7 from "@/assets/images/arrow-7.svg";
import arrow8 from "@/assets/images/arrow-8.svg";
import React, {useState, useEffect} from "react";

export function Step({step, setNewStep, closeModal}) {





    return (
       <>

           {step === 1 &&

               <div className="flex justify-between
                               absolute
                               tablet:top-0 tablet:left-[60px] tablet:right-0
                               top-[200px] left-[-360px] right-0
                               text-textColor">
                   <Image src={cross} className="absolute z-10 top-0 right-0 cursor-pointer" onClick={closeModal} alt={cross} />
                   <div
                       className="flex flex-col justify-between items-start max-w-[238px] mr-[69px] relative z-30">
                       <p className="text-2xl font-bold mb-10">Step#1</p>

                       <p className="text-lg mb-10">Download & Install the MetaMask wallet extension on a
                           desktop
                           browser, such as Chrome, to store and manage bNXT.
                           <Link href="" className="text-lg font-semibold hover:underline"> Here&apos;s a
                               step-by-step
                               guide on how to install the MetaMask extension and sign up for an
                               account.</Link>
                       </p>

                       <Link href=""
                             className="grid grid-cols-2 gap-[8px] bg-textColor text-primaryBgColor items-center rounded-md min-w-[130px] h-[42px] px-[32.5px] py-2"
                             onClick={() => setNewStep(2)
                             }>
                           <span className="text-base">Next</span>
                           <Image src={nextArrow} className="w-4 h-3 mx-auto" alt={nextArrow}/>
                       </Link>

                   </div>

                   <div className="absolute tablet:hidden bottom-[-130px] right-[30px] z-50">
                       <Image src={arrow1} className="relative z-30" alt={arrow1}/>
                       <Image src={arrow2} className="relative z-30" alt={arrow2}/>
                   </div>

                   <Image src={arrow3} className="absolute bottom-[-120px] right-[50px] tablet:block hidden z-30" alt={arrow3}/>

               </div>

           }

           {step === 2 &&

           <div className="flex justify-between
                               absolute
                               tablet:top-0 tablet:left-[60px] md:right-0
                               top-[200px] left-[-360px] right-0
                               text-textColor">
               <Image src={cross} className="absolute z-10 top-0 right-0 cursor-pointer" onClick={closeModal} alt={cross} />
               <div
                   className="flex flex-col justify-between items-start max-w-[238px] mr-[69px] relative z-30">
                   <p className="text-2xl font-bold mb-10">Step#2</p>

                   <p className="text-lg sx:text-end mb-10">You can buy BNB within MetaMask via Wyre or
                       CoinSwitch by
                       clicking the buy button. If you are not familiar with BNB currency, don&apos;t
                       worry!
                       We&apos;ve
                       got you covered.
                       <Link href="" className="text-lg font-semibold hover:underline"> Here are
                           step-by-step
                           instructions on how to buy BNB. </Link>
                   </p>

                   <Link href=""
                         className="grid grid-cols-2 gap-[8px] bg-textColor text-primaryBgColor items-center rounded-md min-w-[130px] h-[42px] px-[32.5px] py-2"
                         onClick={() => setNewStep(3)
                         }>
                       <span className="text-base">Next</span>
                       <Image src={nextArrow} className="w-4 h-3 mx-auto" alt={nextArrow}/>
                   </Link>

               </div>

               <div className="absolute tablet:hidden bottom-[-130px] right-[30px] z-50">
                   <Image src={arrow1} className="relative z-30" alt={arrow1}/>
                   <Image src={arrow2} className="relative z-30" alt={arrow2}/>
               </div>

               <Image src={arrow3} className="absolute bottom-[-120px] right-[50px] tablet:block hidden z-30" alt={arrow3}/>

           </div>

           }

           {step === 3 &&

               <div className="flex justify-between absolute
                                tablet:top-[-220px] tablet:left-[20px]
                                md:left-[-300px]
                                top-[130px] left-[-560px] right-0
                                text-textColor z-20">
                   <Image src={cross} className="absolute z-10 md:top-[150px] top-[100px] right-0 cursor-pointer" onClick={closeModal} alt={cross} />
                   <div
                       className="flex flex-col justify-between items-start max-w-[238px] mt-[140px] mr-[69px] relative">
                       <p className="text-2xl font-bold mb-10">Step#3</p>

                       <p className="text-lg mb-10">Connect your MetaMask wallet and trade some of your BNB for
                           bNXT.
                           <Link href="" className="text-lg font-semibold hover:underline"> Check out our
                               comprehensive guide on how to change currencies </Link>
                           and safely save all your data in MetaMask.</p>

                       {/*<Link href=""*/}
                       {/*      className="grid grid-cols-2 gap-[8px] bg-textColor text-primaryBgColor items-center rounded-md min-w-[130px] h-[42px] px-[32.5px] py-2"*/}
                       {/*      onClick={() => setNewStep(4)}>*/}
                       {/*    <span className="text-base">Next</span>*/}
                       {/*    <Image src={nextArrow} className="w-4 h-3 mx-auto" alt={nextArrow}/>*/}
                       {/*</Link>*/}

                       <Link href=""
                             className="flex gap-[8px] bg-textColor text-primaryBgColor items-center rounded-md max-w-[154px] h-[42px] pl-5 pr-6 py-2"
                             onClick={closeModal}
                       >
                           <span className="text-base">Buy $BNXT</span>
                           <Image src={nextArrow} className="w-4 h-3 mx-auto" alt={nextArrow}/>
                       </Link>

                   </div>

                   <Image src={arrow5} className="absolute mdd:hidden top-[240px] left-[270px]" alt={arrow5}/>

                   <Image src={arrow3} className="absolute top-[370px] right-[30px] tablet:block hidden" alt={arrow3}/>

               </div>

           }

           {/*{step === 4 &&*/}

           {/*<div className="flex justify-between absolute*/}
           {/*                     tablet:top-[-500px] tablet:left-[38px]*/}
           {/*                     md:left-[-300px]*/}
           {/*                     top-[30px] left-[-560px] right-0*/}
           {/*                     text-textColor z-20">*/}
           {/*    <Image src={cross} className="absolute z-10 top-[150px] md:right-[25px] right-[-50px] cursor-pointer" onClick={closeModal} alt={cross} />*/}
           {/*    <div*/}
           {/*        className="flex flex-col justify-between items-start max-w-[238px] mt-[140px] mr-[69px] relative">*/}
           {/*        <p className="text-2xl font-bold mb-8">Step#4</p>*/}

           {/*        <p className="text-lg mb-8">Connect your MetaMask wallet and trade some of your BNB for*/}
           {/*            bNXT.*/}
           {/*            <Link href="" className="text-lg font-semibold hover:underline"> Check out our*/}
           {/*                comprehensive guide on how to change currencies </Link>*/}
           {/*            and safely save all your data in MetaMask.</p>*/}

           {/*        <Link href=""*/}
           {/*              className="flex gap-[8px] bg-textColor text-primaryBgColor items-center rounded-md max-w-[154px] h-[42px] pl-5 pr-6 py-2"*/}
           {/*              onClick={closeModal}*/}
           {/*        >*/}
           {/*            <span className="text-base">Buy $BNXT</span>*/}
           {/*            <Image src={nextArrow} className="w-4 h-3 mx-auto" alt={nextArrow}/>*/}
           {/*        </Link>*/}

           {/*    </div>*/}

           {/*    <Image src={arrow5} className="absolute mdd:hidden top-[240px] left-[270px]" alt={arrow5}/>*/}
           {/*    <Image src={arrow7} className="absolute sx:hidden tablet:top-[1120px] top-[580px] tablet:left-0 md:left-[300px] left-[550px]" alt={arrow7}/>*/}
           {/*    <Image src={arrow8} className="absolute sx:hidden sm:right-[130px] sx:top-[880px] sm:top-[860px] tablet:top-[820px] top-[290px] right-[100px]" alt={arrow8}/>*/}

           {/*    <Image src={arrow3} className="absolute top-[360px] right-[20px] tablet:block hidden" alt={arrow3}/>*/}

           {/*</div>*/}

           {/*}*/}
           </>

    )
}


