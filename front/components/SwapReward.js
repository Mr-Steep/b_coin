import logo from "../assets/images/logo-white.svg"
import Image from "next/image";
import arrowDark from "../assets/images/arrow-dark.svg";
import arrowLight from "../assets/images/arrow-light.svg";
import arrowBack from "../assets/images/backArrow.svg";
import logout from "../assets/images/logout.svg";
import Link from "next/link";
import {SwapForm} from "./SwapForm";
import {Modal} from "./Modal";
import {useState, useEffect, useRef} from "react";
import headerSwap from "../assets/images/swap-header.png";
import headerReward from "../assets/images/reward-header.png";
import headerProject from "../assets/images/project-header.png";
import {Layout} from "./Layout";
import Cookies from 'js-cookie';
import {ThankYou} from "@/components/ThankYou";
import {Footer} from "@/components/Footer";
import data from "../assets/bNXTdata"
import {Confirmation} from "./Confirmation";
import {ConnectWallet} from "./ConnectWallet";
import styles from '../styles/custom-styles.module.css';

const NAME_COOKIE = 'is_close'
export function SwapReward({_active}) {


    const [modalVisible, setModalVisible] = useState(false);
    const [selectAccount, setSelectAccount] = useState(null);
    const [active, setActive] = useState(_active);
    const [step, setStep] = useState(0);
    const [getBalance, setBalance] = useState(0);
    const [getMultiplier, setMultiplier] = useState(0);
    const [getCurrentAddress, setCurrentAddress] = useState(0)
    const [getTransactionComplete, setTransactionComplete] = useState(0)
    const [getIsUserUseMultiplayer, setIsUserUseMultiplayer] = useState(0)
    const [getGlobalMultiplayer, setGlobalMultiplayer] = useState(0);
    const [getConfirmationComplete, setConfirmationComplete] = useState(false);


    const FIRSTLY_CONNECTION = 'firstly_connection'

    const setNewStep = (newStep) => setStep(newStep);


    const openModal = (e) => {
        e.preventDefault();
        if(active) return
        setModalVisible(true)
        localStorage.setItem('steps', true)
        setStep(1)
        window.scrollTo({
           top: 0,
           behavior: 'smooth',
});
        const screenWidth = window.innerWidth;
        if(screenWidth >= 768) {
            document.body.style.overflow = 'hidden';
        }

    }

    const disconnect = async () => {
        localStorage.removeItem(FIRSTLY_CONNECTION)
        setSelectAccount(null)
        location.reload()
    }

    useEffect(() => {
        if(!modalVisible) {
            localStorage.removeItem('steps')
        }
    }, [])

    useEffect(() => {
        const is_close = !Cookies.get(NAME_COOKIE);
        setModalVisible(is_close);
        if(is_close){
            setStep(1)
        }

    }, []);


    const handleSetActive = (state) => {
        setActive(state)
    }

    const closeModal = () => {
        setModalVisible(false)
        localStorage.removeItem('steps')
        setNewStep(0)
        Cookies.set(NAME_COOKIE, true)
        document.body.style.overflow = 'auto';
    }





    return (
        <Layout modalVisible={modalVisible} closeModal={closeModal}>
            <div className="flex flex-col justify-between min-h-screen">
                <div className={"lg:max-h-[380px] "
                +(modalVisible && step!== 4 ? 'h-[100px]' : modalVisible && step === 4 ? 'md:h-[482px] h-[100px]' : 'h-[482px] '
                )}
                     style={{
                         backgroundImage: `url(${headerProject.src})`,
                         backgroundRepeat: 'no-repeat',
                         backgroundSize: 'cover'
                     }}
                >
                    <Link href="https://dev.bnxt.network/home/">
                        <Image className="md: pt-[23px] md:ml-4 ml-[119px] md:w-[138px] w-[188px] md:mb-[132px] mb-[172px]" src={logo} alt={logo}
                               height="32px"/>
                    </Link>
                    <Link href="/" className="flex items-center justify-between min-w-[148px] sm:block hidden ml-5 mb-[9px]">
                        <Image src={arrowBack} className="inline-block" alt={arrowBack}/>
                        <span className="text-sm font-medium text-textColor ml-2">Back to Home page</span>
                    </Link>
                    <p className={"sx:text-[40px] text-textColor sx:leading-[43.52px] lg:leading-[60.93px] leading-[104.45px] font-bold w-full md:mb-4 sx:ml-[15px] md:ml-[100px] lg:ml-[120px] ml-[200px] mb-[38px] "
                    + (active && !getIsUserUseMultiplayer ? 'lg:text-[40px] text-[60px] lg:leading-[43.52px] lg:max-w-[430px] max-w-[697px]' :
                        'lg:text-[56px] text-[96px] lg:max-w-[380px] max-w-[697px]')}>
                        {active && !getIsUserUseMultiplayer?
                            'Get your 90% discount with x' + getMultiplier + ' multiplier'
                            : 'Join the bNXT Network'}
                    </p>
                    {
                        !selectAccount ?
                            <ConnectWallet
                                // active={this.state.selectAccount}
                                // connectWallet={this._connectWallet}
                                // networkError={this.state.networkError}
                                // dismiss={this._dismissNetworkError}
                                // _setNetworkError={this._setNetworkError}
                                _class="absolute sx:right-4 lg:right-[100px] top-[26px] right-[200px] bg-gradient-to-r from-[#29C8A9] to-[#703AAD] text-textColor font-medium rounded-md sx:max-w-[157px] max-h-[50px] w-[200px] md:px-5 px-4 py-3 text-[18px] sx:py-[12px] sx:px-[16px] transform-gpu transition-transform duration-200 ease-in-out hover:scale-95 focus:scale-95 active:scale-95 "

                            /> :
                            selectAccount &&
                            <div
                                onClick={disconnect}
                                className={`${styles['border-gradient']} absolute sx:right-4 lg:right-[100px] top-[26px] right-[200px] text-textColor font-medium rounded-md sx:max-w-[157px] max-w-[200px] h-[50px] w-full p-[1px] transform-gpu transition-transform duration-200 ease-in-out hover:scale-95 focus:scale-95 active:scale-95`}>

                                <Link className={'flex items-center justify-between gap-[12.5px] bg-primaryBgColor text-textColor font-medium rounded-md sx:max-w-[157px] max-w-[200px] max-h-[50px] w-full md:px-5 px-4 py-3 '}
                                      href={''}><span>{selectAccount?.slice(0, 6) + '...' + selectAccount?.slice(-6)}</span>
                                    <Image src={logout} className="sx:hidden" alt={logout}/>
                                </Link>
                            </div>

                    }
                </div>
                <div className="w-full grow bg-textColor sm:px-4 px-[111px]"
                >


                    <div className={"flex justify-between md:items-center items-start mx-auto w-full max-w-[1440px] pt-[53px] md:mb-[166px] mb-[-166px] "
                    +(modalVisible ? 'md:flex-col-reverse md:pt-0 md:mt-0 md:pb-0' : 'md:flex-col'
                    )}>
                        <div className={"flex flex-col justify-between items-center sm:mx-auto sm:max-w-[90%] lg:max-w-[492px] max-w-[616px] mr-4 "
                        +(modalVisible ? 'md:mt-[230px]' : 'md:mt-0'
                        )}>
                            {/*<p className={"md:text-[50px] text-[86px] text-primaryBgColor md:leading-[54.4px] leading-[93.57px] font-bold md:mb-4 mb-[38px] "*/}
                            {/*+ (active && !getIsUserUseMultiplayer ? 'max-w-[588px]' :*/}
                            {/*    'max-w-[570px]')}>*/}
                            {/*    {active && !getIsUserUseMultiplayer?*/}
                            {/*        'Get your 90% discount right now with x' + getMultiplier + ' multiplier'*/}
                            {/*        : 'Join the bNXT Network'}*/}
                            {/*</p>*/}
                            <div className={"md:mb-[33px] text-primaryBgColor text-lg sm:leading-[26px] "
                            + (active ? 'mb-[33px]' :
                                'mb-[53px]')}
                                 >
                                <p className="sm:mb-[1.45rem] mb-4">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
                                    sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt
                                    nostrud amet.</p>

                                <ul className="">

                                    <li className="mb-4 ml-5"
                                    >Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                                        amet sint. Velit officia consequat duis enim velit mollit.
                                    </li>
                                    <li className={"ml-5 "
                                    + (active ? 'mb-0' :
                                        'mb-4')}>
                                        Amet minim mollit non deserunt ullamco est sit aliqua.
                                    </li>
                                    {!active &&
                                    <li className="ml-5">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
                                        sint. Velit officia.</li>
                                    }
                                </ul>
                            </div>

                            <div className="flex md:flex-col justify-between items-center md:mb-[52px]">
                                <Link href=""
                                      className="group mx-auto flex gap-[13px] items-center justify-between rounded-md border-black border md:min-w-[293px] min-w-[284px] max-h-[60px] w-full px-[17px] py-[17px] md:mr-0 mr-[10px] md:mb-[10px]"
                                      onClick={openModal}>
                                    <span className="text-primaryBgColor text-lg">Learn more</span>
                                    <Image src={arrowDark}
                                           className="w-[23px] h-[23px] group-hover:rotate-45 transition duration-300 ease-in"
                                           alt={""}/>
                                </Link>


                                {/*{!!getCurrentAddress && getBalance > 0 &&*/}

                                <Link
                                    href={active?'/':'/reward'}
                                    className="group mx-auto flex gap-[13px] bg-primaryBgColor items-center justify-between rounded-md min-w-[293px] max-h-[60px] w-full px-[17px] py-[17px] ">
                                    <span className="text-textColor text-lg">
                                        {
                                            !getIsUserUseMultiplayer && active && getMultiplier > 0 ? 'Back to Swap page' : 'Buy'
                                        }
                                        {
                                            !getIsUserUseMultiplayer && !active && getMultiplier > 0 &&
                                            <span> Get Reward {getMultiplier}</span>
                                        }
                                    </span>
                                    <Image src={arrowLight}
                                           className="w-[23px] h-[23px] group-hover:rotate-45 transition duration-300 ease-in ml-[70px]"
                                           alt={""}/>
                                </Link>


                                 {/*}*/}

                            </div>
                        </div>

                        <SwapForm
                            data={data}
                            step={step}
                            setNewStep={setNewStep}
                            modalVisible={modalVisible}
                            closeModal={closeModal}
                            setBalance={setBalance}
                            setMultiplier={setMultiplier}
                            active={active}
                            setCurrentAddress={setCurrentAddress}
                            setTransactionComplete={setTransactionComplete}
                            setIsUserUseMultiplayer={setIsUserUseMultiplayer}
                            setGlobalMultiplayer={setGlobalMultiplayer}
                            setSelectAccount={setSelectAccount}
                        />

                    </div>
                </div>

                <Footer/>

                {!!modalVisible &&
                <Modal />
                }


                {!!getTransactionComplete &&
                    <Confirmation
                    setConfirmationComplete={setConfirmationComplete}
                    setTransactionComplete={setTransactionComplete}
                    />

                }
                {
                    getConfirmationComplete &&
                    <ThankYou
                        getMultiplier={getMultiplier}
                        handleSetActive={handleSetActive}
                        setTransactionComplete={setTransactionComplete}
                        getIsUserUseMultiplayer={getIsUserUseMultiplayer}
                        getGlobalMultiplayer={getGlobalMultiplayer}
                    />

                }


            </div>


        </Layout>
    )
}


// const scrollRef = useRef(null);
//
// const [middleOfPageY, setMiddleOfPageY] = useState(0);

// useEffect(() => {
//     const middleOfPage = Math.floor(window.innerHeight / 2);
//     console.log(middleOfPage)
//
//     window.scrollTo({
//         top: middleOfPage,
//         behavior: 'smooth',
//     });
//
// }, [step]);

// useEffect(() => {

//     const middleY = Math.floor(window.innerHeight / 2);
//     setMiddleOfPageY(middleY);
//

//     localStorage.setItem('middleOfPageY', middleY.toString());
// }, [step]);
//
// useEffect(() => {

//     const savedMiddleOfPageY = localStorage.getItem('middleOfPageY');
//

//     if (savedMiddleOfPageY) {
//         window.scrollTo(0, parseInt(savedMiddleOfPageY));
//     }
// }, [step]);

// document.body.style.overflow = 'hidden';
// console.log(scrollRef.current)
// if(scrollRef.current) {
//     scrollRef.current.scrollIntoView();
// }