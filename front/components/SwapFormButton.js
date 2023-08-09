import React from "react";


export function SwapFormButton({_class, buy, currentError, step, _changeAddNetwork}) {

    return (
        <button
            className={_class}
            onClick={currentError? _changeAddNetwork:buy}
            disabled={false}
        >{step === 2 ?
            'Switch to Binance Smart Chain' :
            'Buy BNXT'}
        </button>
    )
}