import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export function ModalChangeNetwork({connectWallet, isRightNetwork, setIsRightNetwork}) {
    const cancelButtonRef = useRef(null);





    return (
        <>
            <Transition.Root show={isRightNetwork} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef}
                        onClose={setIsRightNetwork}>
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
                                <Dialog.Panel className=" bg-white relative w-full max-w-xs min-h-full rounded-xl">
                                    <div className="p-4 sm:p-6">
                                        <div className="">
                                            <Dialog.Title as="h3"
                                                          className="text-2xl p-3 font-semibold text-gray-900">
                                                Check your network
                                            </Dialog.Title>
                                        </div>

                                        <button type="button"
                                                // onClick={changeAddNetwork}
                                                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-2xl text-sm p-4  text-center inline-flex items-center  transform-gpu transition-transform duration-200 ease-in-out hover:scale-95 focus:scale-95 active:scale-95">
                                            Switch to Binance Smart Chain
                                            <svg aria-hidden="true" className="w-5 h-5 ml-2 -mr-1"
                                                 fill="currentColor"
                                                 viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd"
                                                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                                      clipRule="evenodd"></path>
                                            </svg>
                                        </button>
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