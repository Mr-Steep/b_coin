import logo from "../../assets/images/logo-white.svg"
import Image from "next/image";
import arrowDark from "../../assets/images/arrow-dark.svg";
import arrowLight from "../../assets/images/arrow-light.svg";
import arrowBack from "../../assets/images/backArrow.svg";
import logout from "../../assets/images/logout.svg";
import Link from "next/link";
import {SwapForm} from "../SwapForm";
import {Modal} from "../Modal";
import {useState, useEffect, useRef} from "react";
import headerProject from "../../assets/images/project-header.png";
import {Layout} from "../Layout";
import Cookies from 'js-cookie';
import {ThankYou} from "../ThankYou";
import {Footer} from "../Footer";
import data from "../../assets/bNXTdata"
import {Confirmation} from "../Confirmation";
import styles from '../../styles/custom-styles.module.css';
import {SwapFormTips} from "../SwapFormTips";

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
    const [getHash, setHash] = useState(null);


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
        if(screenWidth >= 1268) {
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

    useEffect(() => {
            document.body.style.overflow = 'auto';
    }, [])


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
                <div className={"lg:max-h-[380px] smn:px-[50px] mdm:px-[102px] lgm:px-[111px] px-4 "
                +(modalVisible && step!== 4 ? 'tablet:h-[100px] h-[200px] ' : modalVisible && step === 4 ? 'tablet:h-[482px] h-[200px]' : 'h-[482px] '
                )}
                     style={{
                         backgroundImage: `url(${headerProject.src})`,
                         backgroundRepeat: 'no-repeat',
                         backgroundSize: 'cover'
                     }}
                >
                    <div className="flex flex-col h-full justify-between max-w-[1526px] mx-auto md:pt-[25px] pt-[25px] lg:pb-[52px] pb-[35px] ">
                        <div className="flex justify-between items-center">
                            <Link  className="flex " href="https://dev.bnxt.network/home/">
                                <Image className="sm:w-[126px] w-[188px]" src={logo} alt={logo}
                                       height="32px"/>
                            </Link>
                            {
                                !selectAccount ?
                                    <button
                                       	onClick={ ()=> document.getElementById('connect-wallet').click()}
                                        className="bg-gradient-to-r from-gradientFrom to-gradientTo text-whiteColor font-medium rounded-md sx:max-w-[157px] max-h-[50px] w-[200px] md:px-5 px-4 py-3 sm:text-[16px] text-[18px] sx:py-[12px] sx:px-[16px] transform-gpu transition-transform duration-200 ease-in-out hover:scale-95 focus:scale-95 active:scale-95 "

                                    >Connect Wallet</button> :
                                    selectAccount &&
                                    <div
                                        onClick={disconnect}
                                        className={`${styles['border-gradient']}   text-whiteColor font-medium rounded-md sx:max-w-[157px] max-w-[200px] h-[50px] w-full p-[1px] transform-gpu transition-transform duration-200 ease-in-out hover:scale-95 focus:scale-95 active:scale-95`}>

                                        <Link className={'flex items-center justify-between gap-[12.5px] bg-blackColor text-whiteColor font-medium rounded-md sx:max-w-[157px] max-w-[200px] max-h-[50px] w-full md:px-5 px-4 py-3 '}
                                              href={''}><span>{selectAccount?.slice(0, 6) + '...' + selectAccount?.slice(-6)}</span>
                                            <Image src={logout} className="sx:hidden" alt={logout}/>
                                        </Link>
                                    </div>

                            }
                        </div>
                        <p className={"sx:text-[40px] text-whiteColor leading-[1.1] font-bold w-full md:mb-4 "
                        + (active
                        && !getIsUserUseMultiplayer
                            ? 'lg:text-[40px] text-[60px]  lg:max-w-[430px] max-w-[697px]' :
                            'lg:text-[56px] text-[96px] lg:max-w-[380px] max-w-[697px]')}>
                            <Link href="https://bnxt.network/home/" className=" items-center justify-start min-w-[148px] sm:flex hidden mb-[9px]">
                                <Image src={arrowBack} className="inline-block" alt={arrowBack}/>
                                <span className="text-sm font-medium text-whiteColor ml-2">Back to Home page</span>
                            </Link>
                            {!modalVisible &&
                            <>
                                {active
                                && !getIsUserUseMultiplayer
                                    ?
                                    'Get your 90% discount with x' + getMultiplier + ' multiplier'
                                    : 'Join the BNXT Network'}
                            </>
                            }
                        </p>
                    </div>


                </div>
                <div className="w-full grow bg-whiteColor sm:px-4  smn:px-[50px] mdm:px-[102px] lgm:px-[111px] px-[16px] pb-[48px] "
                >

                    <div className={"flex justify-between tablet:flex-col tablet:items-center items-start mx-auto w-full max-w-[1526px] relative lgm:mb-0 mdm:mb-[-33px] mdm:mb-[-79px]  mb-0 "
                    +(modalVisible ? 'tablet:flex-col-reverse md:pt-0 md:mt-[15px] md:pb-0' : ''
                    )}>
                        <div className={"flex flex-col justify-between tablet:items-center items-start sm:mx-auto sm:max-w-[90%] lg:max-w-[520px] md:min-w-[375px] max-w-[616px] sx:w-full md:w-[45%] mr-4 sx:pt-[24px] mdd:pt-[52px] lg:pt-[63px] pt-[97px] sx:min-w-[auto]  "
                        +(modalVisible ? 'tablet:mt-[100px]' : 'md:mt-0'
                        )}>
                            <div className={"md:mb-[33px] text-blackColor text-lg sm:leading-[26px] "
                            + (active ? 'mb-[33px]' :
                                'lg:mb-[37px] mb-[65px]')}
                                 >

                                {active
                                && !getIsUserUseMultiplayer
                                    ?
                                    <div className="flex flex-col justify-between items-start mt-[-35px]">
                                        <ul className="sx:text-base lg:text-lg text-[22px] font-semibold text-blackColor list-disc mb-5">ONE TIME BONUS MULTIPLIER:
                                            <li className="sx:text-base lg:text-lg text-[22px] font-normal text-greyColor mt-5 mb-[10px] ml-7">Works until 40000 packages are sold</li>
                                            <li className="sx:text-base lg:text-lg text-[22px] font-normal text-greyColor mb-[10px] ml-7">Multiplies your packages the same number of times that the number of your packages</li>
                                            <li className="sx:text-base lg:text-lg text-[22px] font-normal text-greyColor mb-[10px] ml-7">You can use it once</li>
                                            <li className="sx:text-base lg:text-lg text-[22px] font-normal text-greyColor mb-[10px] ml-7">You can multiply it for 10% fee of the reward equivalent</li>
                                        </ul>

                                        <ul className="sx:text-base lg:text-lg text-[22px] font-semibold text-blackColor list-disc mb-5">GLOBAL MULTIPLIER:
                                            <li className="sx:text-base lg:text-lg text-[22px] font-normal text-greyColor mt-5 mb-[10px] ml-7">Works after 40000 packages are sold</li>
                                            <li className="sx:text-base lg:text-lg text-[22px] font-normal text-greyColor mb-[10px] ml-7">Multiplies your packages x2</li>
                                            <li className="sx:text-base lg:text-lg text-[22px] font-normal text-greyColor mb-[10px] ml-7">You can use it as many times as you want</li>
                                            <li className="sx:text-base lg:text-lg text-[22px] font-normal text-greyColor mb-[10px] ml-7">You can multiply it for 10% fee of the reward equivalent</li>
                                        </ul>

                                    </div> :
                                    <>
                                        <p className="sm:mb-[1.45rem] mb-4 sx:text-[16px] lg:text-[18px] text-[22px] lg:mb-[22px] mb-[32px]">Amet
                                            minim mollit non deserunt ullamco est sit aliqua dolor do amet
                                            sint. Velit officia consequat duis enim velit mollit. Exercitation veniam
                                            consequat sunt
                                            nostrud amet.</p>

                                        <ul className="sx:text-[16px] lg:text-[18px] text-[22px] list-disc pl-4">

                                            <li className="mdd:mb-2 mb-4 ml-5"
                                            >Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                                                amet sint. Velit officia consequat duis enim velit mollit.
                                            </li>
                                            <li className={"ml-5 "
                                            + (active ? 'mdd:mb-2 mb-0' :
                                                'mdd:mb-[8px] mb-4')}>
                                                Amet minim mollit non deserunt ullamco est sit aliqua.
                                            </li>
                                            {!active &&
                                            <li className="ml-5">Amet minim mollit non deserunt ullamco est sit aliqua
                                                dolor do amet
                                                sint. Velit officia.</li>
                                            }
                                        </ul>
                                    </>
                                }

                            </div>

                            <div className="flex tabletLand:flex-col justify-between tabletLand:items-start items-center tablet:mb-[52px] tablet:w-full">
                                <Link href=""
                                      className="group mx-auto flex gap-[13px] tabletLand:m-0 items-center justify-between rounded-md border-black border w-max md:min-w-[209px] min-w-[209px] px-[17px] py-[17px] tablet:mr-0 mr-[10px] tabletLand:mb-[10px] tablet:w-full"
                                      onClick={openModal}>
                                    <span className="text-blackColor text-lg font-medium">Learn more</span>
                                    <Image src={arrowDark}
                                           className="w-[23px] h-[23px] group-hover:rotate-45 transition duration-300 ease-in"
                                           alt={""}/>
                                </Link>

                                {(getBalance > 0 && !getIsUserUseMultiplayer) &&
                                    <Link
                                        href={active ? '/' : '/reward'}
                                        className="group tabletLand:mx-0 mx-auto flex gap-[13px] bg-blackColor items-center border justify-between rounded-md min-w-[209px]  w-max px-[17px] py-[17px] tablet:w-full">
                                    <span className="text-whiteColor text-lg font-medium">
                                        {
                                            active ?
                                                <span> Back to Swap page</span>
                                                :
                                            <span> Get Reward x{getMultiplier}</span>



                                        }
                                        {/*{*/}
                                        {/*    !getIsUserUseMultiplayer && active && getMultiplier > 0 ? 'Back to Swap page' : 'Buy'*/}
                                        {/*}*/}
                                        {/*{*/}
                                        {/*    !getIsUserUseMultiplayer && !active && getMultiplier > 0 &&*/}
                                        {/*    */}
                                        {/*}*/}
                                    </span>
                                        <Image src={arrowLight}
                                               className="w-[23px] h-[23px] group-hover:rotate-45 transition duration-300 ease-in ml-[70px]"
                                               alt={""}/>
                                    </Link>

                                }




                            </div>
                        </div>

                        {!!modalVisible ?
                            <SwapFormTips
                                data={data}
                                step={step}
                                tips={true}
                                setNewStep={setNewStep}
                                modalVisible={modalVisible}
                                closeModal={closeModal}/> :
                            <SwapForm
                                data={data}
                                setBalance={setBalance}
                                setMultiplier={setMultiplier}
                                active={active}
                                setCurrentAddress={setCurrentAddress}
                                setTransactionComplete={setTransactionComplete}
                                setIsUserUseMultiplayer={setIsUserUseMultiplayer}
                                setGlobalMultiplayer={setGlobalMultiplayer}
                                setSelectAccount={setSelectAccount}
                                setHash={setHash}
                            />
                        }

                    </div>

                </div>

                <Footer/>

                {!!modalVisible &&
                <Modal />
                }


                {
                    !!getTransactionComplete &&
                    <Confirmation
                    getTransactionComplete={getTransactionComplete}
                    setConfirmationComplete={setConfirmationComplete}
                    setTransactionComplete={setTransactionComplete}
                    hash={getHash}
                    countTokens={getBalance}
                    />
                }
                {
                    getConfirmationComplete &&
                    <ThankYou
                        getMultiplier={getMultiplier}
                        handleSetActive={handleSetActive}
                        getConfirmationComplete={getConfirmationComplete}
                        setConfirmationComplete={setConfirmationComplete}
                        getIsUserUseMultiplayer={getIsUserUseMultiplayer}
                        getGlobalMultiplayer={getGlobalMultiplayer}
                    />
                }
            </div>
        </Layout>
    )
}