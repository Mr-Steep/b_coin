import {ethers} from "ethers";
import {NETWORK_ID} from "./SwapForm";


export const showError = (state, error) => {
    state.currentError = error
}

export const transTo = (riceInWei) => {
    const strRiceInWei = (parseFloat(riceInWei)).toFixed(18).toString()
    const wei = ethers.utils.parseEther(strRiceInWei);
    return wei.toString()
}

export const _clear = (state) => {
    state.inputValue = 0
    state.priceInBnb = 0
    state.totalCostUSD = 0
    state.priceInWei = 0
}

export const _resetState = (state, initialState) => {
    state(initialState)
}

export const _checkNetwork = (NETWORK_ID) => {
    if (window.ethereum.networkVersion === NETWORK_ID) {
        return true
    }
}

export const checkError = (message) => {
    const errors = [
        'You are trying to buy more',
        'Not an Owner',
        'New owner cannot be zero address',
        'Insufficient funds',
        'Contract has no tokens',
        'The amount of the token must be equal to the balance on the wallet',
        'Token amount is below minimum',
        'Token amount is above maximum',
        'Token amount must be a multiple of the',
        'Token amount can be maximum 1000',
        'Bonus has been used',
        'Time has not come yet',
    ]
    for (const i in errors) {
        if (message.includes(errors[i])) {
            alert(errors[i]);
        }
    }
    return false;
}

export const _addTokenToMetaMask = async () => {
    // Check if MetaMask is installed
    if (typeof window.ethereum === 'undefined') {
        console.log('MetaMask is not installed.');
        return;
    }

    // Request the permission to access the MetaMask accounts
    await window.ethereum.request({method: 'eth_requestAccounts'});

    try {
        // Add the token to MetaMask
        await window.ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20',
                options: {
                    address: process.env.NEXT_PUBLIC_PRODUCTION_TOKEN_ADDRESS,
                    symbol: process.env.NEXT_PUBLIC_PRODUCTION_TOKEN_SYMBOL,
                    decimals: process.env.NEXT_PUBLIC_PRODUCTION_TOKEN_DECIMALS,
                },
            },
        });
        console.log('Token added to MetaMask successfully.');
    } catch (error) {
        console.log('Error adding token to MetaMask:', error);
    }
}

export const _addNetwork = async () => {
    const chainId = process.env.NEXT_PUBLIC_PRODUCTION_NETWORK_CHAIN_ID
    const hexString = Number(chainId).toString(16);
    const _chainId = "0x" + hexString;
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{chainId: _chainId}],
        });
    } catch (switchError) {
        const originallyError = switchError?.data?.originalError?.code
        if (switchError.code === 4902 || originallyError === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: _chainId,
                            chainName: process.env.NEXT_PUBLIC_PRODUCTION_NETWORK_CHAIN_NAME,
                            nativeCurrency: {
                                name: process.env.NEXT_PUBLIC_PRODUCTION_NETWORK_NATIVE_CURRENCY_NAME,
                                symbol: process.env.NEXT_PUBLIC_PRODUCTION_NETWORK_NATIVE_CURRENCY_SYMBOL,
                                decimals: parseInt(process.env.NEXT_PUBLIC_PRODUCTION_NETWORK_NATIVE_CURRENCY_DECIMALS, 10),
                            },
                            rpcUrls: [process.env.NEXT_PUBLIC_PRODUCTION_NETWORK_RPC_URLS]
                        },
                    ],
                });
            } catch (addError) {
                console.log(addError)
            }
        }
    } finally {
        _resetState()
    }
}

