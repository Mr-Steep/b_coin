import React from "react";


export function SwapFormButton({_class, step, disabled, buy, currentError, _changeAddNetwork}) {

    return (
        <button
            className={_class}
            onClick={currentError? _changeAddNetwork:buy}
            disabled={disabled}
        >{currentError && currentError === 'Please connect to another Network' || step
            ? 'Switch to Binance Smart Chain'
            : 'Buy BNXT'
        }
        </button>
    )
}