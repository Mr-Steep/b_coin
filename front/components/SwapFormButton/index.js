import Image from "next/image";
import loader from "../../assets/images/loader.svg";


export function SwapFormButton({_class, buy, step, currentError, active, _changeAddNetwork, disabledBtn = false, isLoading}) {


    return (
        <button
            className={ disabledBtn ? `${_class} opacity-30` : step ? `${_class}` : `${_class} hover:scale-95 focus:scale-95 active:scale-95`}
            onClick={currentError ? _changeAddNetwork : buy}
            disabled={disabledBtn}
        >{currentError && currentError === 'Please connect to another Network' || step
            ? 'Switch to Binance Smart Chain'
            : active ? 'Claim'
            : 'Buy BNXT'
        }
            {isLoading &&
            <Image src={loader} className="w-[30px] h-[30px]" alt={'loader'}/>
            }
        </button>
    )
}