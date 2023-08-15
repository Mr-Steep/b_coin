import {useState, useEffect} from 'react'
import loader from "../assets/images/loader.svg";
import Image from "next/image";

export function SwapFormButton({_class, buy, step, currentError, _changeAddNetwork, disabledBtn, isLoading}) {


    return (
        <button
            className={disabledBtn ? `${_class} hover:scale-95 focus:scale-95 active:scale-95`:`${_class} opacity-30`}
            onClick={currentError? _changeAddNetwork:buy}
            disabled={!disabledBtn}
        >{currentError && currentError === 'Please connect to another Network'
            ? 'Switch to Binance Smart Chain'
            : 'Buy BNXT'
        }
            {isLoading &&
            <Image src={loader} className="w-[30px] h-[30px]" alt={'loader'}/>
            }
        </button>
    )
}