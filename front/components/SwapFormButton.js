import React from "react";


export function SwapFormButton({_class, buy, currentError, _changeAddNetwork, disabledBtn}) {

    return (
        <button
            className={disabledBtn ? `${_class} opacity-30` : `${_class} hover:scale-95 focus:scale-95 active:scale-95`}
            onClick={currentError? _changeAddNetwork:buy}
            disabled={disabledBtn}
        >{currentError && currentError === 'Please connect to another Network'
            ? 'Switch to Binance Smart Chain'
            : 'Buy BNXT'
        }
        </button>
    )
}