import {Fragment, useRef, useState, useEffect} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import Image from "next/image";
import metamask from "@/assets/images/metamask.png";
import {NETWORK_ID} from "@/components/SwapForm"


export function ConnectWallet({_class, connectWallet, setNetworkError}) {

    const [open, setOpen] = useState(false)
    const [errorMetamask, setErrorMetamask] = useState(false)
    const cancelButtonRef = useRef(null)

    const [isDisabled, setIsDisabled] = useState(false)

    useEffect(() => {
        if(localStorage.getItem('steps')) {
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
    })


    const openModal = () => {
            setOpen(true)
    }


    const _clickMetamask = () => {
        const provider = getCurrentProvider()

        if (provider === 'metamask') {
            console.log('MetaMask поддерживается');
            if (typeof window.ethereum !== 'undefined') {
                ethereum
                    .request({method: 'net_version'})
                    .then((networkId) => {
                        console.log('Current network ID:', networkId);
                        console.log('NETWORK_ID', NETWORK_ID);
                        if (NETWORK_ID !== networkId) {
                            setNetworkError("Please connect to another Network")
                            setOpen(false)

                        } else {
                            connectWallet()
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                console.error('MetaMask is not installed');
            }
            return 2;

        } else {
            setErrorMetamask(true)
            console.log('MetaMask is not installed');
        }
    }
    const getCurrentProvider = () => {
        if (!window.web3) return 'unknown';

        if (window.web3.currentProvider.isMetaMask)
            return 'metamask';

        if (window.web3.currentProvider.isTrust)
            return 'trust';

        if (window.web3.currentProvider.isGoWallet)
            return 'goWallet';

        if (window.web3.currentProvider.isAlphaWallet)
            return 'alphaWallet';

        if (window.web3.currentProvider.isStatus)
            return 'status';

        if (window.web3.currentProvider.isToshi)
            return 'coinbase';

        if (typeof window.__CIPHER__ !== 'undefined')
            return 'cipher';

        if (window.web3.currentProvider.constructor.name === 'EthereumProvider')
            return 'mist';

        if (window.web3.currentProvider.constructor.name === 'Web3FrameProvider')
            return 'parity';

        if (window.web3.currentProvider.host && window.web3.currentProvider.host.indexOf('infura') !== -1)
            return 'infura';

        if (window.web3.currentProvider.host && window.web3.currentProvider.host.indexOf('localhost') !== -1)
            return 'localhost';

        return 'unknown';
    }


    return (
        <>
            <button type="button"
                    className={_class}
                    disabled={isDisabled}
                    onClick={openModal}
            >
                Connect wallet
            </button>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-4 sm:p-0 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className=" bg-white relative w-full max-w-sm min-h-full rounded-xl">
                                    <div className="p-8 sm:p-6">
                                        <div>
                                            <div className="sm:flex ">
                                                <div className="mt-3 sm:ml-4 sm:mt-0">
                                                    <Dialog.Title as="h3"
                                                                  className="text-2xl pb-2 font-semibold leading-6 text-gray-900">
                                                        Connect Wallet
                                                    </Dialog.Title>
                                                    <div className="pt-5">
                                                        <p className="text-sm text-gray-700">
                                                            Start by connecting with one of the wallets below. Be
                                                            sure
                                                            to
                                                            store your private keys or seed phrase securely. Never
                                                            share
                                                            them with anyone.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-center py-6 text-xs">
                                            <div
                                                className='transform-gpu transition-transform duration-200 ease-in-out hover:scale-95 focus:scale-95 active:scale-95'>
                                                <Image src={metamask}
                                                       onClick={_clickMetamask}
                                                       className="w-16 h-16 cursor-pointer hover:opacity-80 "
                                                       alt={'Metamask'}/>
                                                <h4 className="my-2 text-gray-900 dark:text-white">Metamask</h4>
                                            </div>
                                        </div>


                                        <div className="">
                                            <a type="button"
                                                    target='_blank'
                                                    href='/onboarding'
                                                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-2xl text-sm px-5 py-2.5 mr-2 mb-2 text-center inline-flex items-center  transform-gpu transition-transform duration-200 ease-in-out hover:scale-95 focus:scale-95 active:scale-95">
                                                Learn How to Connect
                                                <svg aria-hidden="true" className="w-5 h-5 ml-2 -mr-1"
                                                     fill="currentColor"
                                                     viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd"
                                                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                                          clipRule="evenodd"></path>
                                                </svg>
                                            </a>
                                        </div>

                                        {
                                            errorMetamask &&
                                            <div
                                                className="p-4 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300"
                                                role="alert">
                                                <span
                                                    className="font-medium">Metamask is not installed or disabled</span>
                                            </div>
                                        }
                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}