import {ethers} from "ethers";
import tokenShopAddress from "../contracts/TokenShop-contract-address.json";
import tokenShopArtifact from "../contracts/TokenShop.json";



export const buy = async (state, active, buyTokens, buyTokensBonus) => {
    state.isLoading = true

    try {
        if (state.globalMultiplier > 0) {
            await buyTokens()
        } else {
            if (active) {
                await buyTokensBonus()
            } else {
                await buyTokens()
            }
        }
        state.isLoading = false

    } catch (error) {
        console.error('Error fetching data:', error);
        state.isLoading = false

    }
}

export const buyTokensBonus = async (state, _tokenShop, fsetTransactionComplete, fsetHash, _clear, checkError, updateBalance, ERROR_CODE_TX_REJECTED_BY_USER) => {
    const inWei = state.priceInWei
    try {
        const overrides = {
            value: inWei.toString()
        };
        const tx = await _tokenShop.buyTokensBonus(overrides)
        state.txBeingSent = tx.hash
        await tx.wait()
        fsetTransactionComplete(true)
        fsetHash(tx.hash)
        _clear()
    } catch (e) {
        if (e.code === ERROR_CODE_TX_REJECTED_BY_USER) {
            console.log('user cancel ' + ERROR_CODE_TX_REJECTED_BY_USER)
            return
        }
        console.error(e);
        checkError(e.message)
    }
    await updateBalance()
}

export const buyTokens = async (state, _tokenShop, fsetTransactionComplete, fsetHash, _clear, checkError, updateBalance, ERROR_CODE_TX_REJECTED_BY_USER) => {
    // const signer = this._provider.getSigner(0)
    try {
        let amountToken = state.inputValue
        const overrides = {
            value: state.priceInWei.toString()
        };
        if (state.globalMultiplier > 0) {
            amountToken = state.countTokensCurrent
        }
        const tx = await _tokenShop.buyTokens(amountToken, overrides)
        state.txBeingSent = tx.hash
        await tx.wait()
        fsetTransactionComplete(true)
        fsetHash(tx.hash)
        _clear()
    } catch (e) {
        console.error(e);
        if (e.code === ERROR_CODE_TX_REJECTED_BY_USER) {
            console.log('user cancel' + ERROR_CODE_TX_REJECTED_BY_USER)
            if (state.globalMultiplier === 0) {
                _clear()
            }
            return
        }
        checkError(e.message)
    }
    await updateBalance()
}

export const showError = (state, error) => {
    state.currentError = error
}

export const updateBalance = async(state, _provider, _tokenShop, fsetBalance, fMultiplier, fsetIsUserUseMultiplayer, fsetGlobalMultiplayer, getRate) => {
    const newBalance = (await _provider.getBalance(state.selectAccount))?.toString()
    const countTokens = (await _tokenShop.tokenBalanceContract())
    const countBNB = await _tokenShop.provider.getBalance(_tokenShop.address)
    const multiplier = await _tokenShop.getMultiplier()
    const countTokensCurrent = await _tokenShop.tokenBalanceCurrent()
    const isUsedMultiplier = await _tokenShop.getIsUsed()
    const _globalMultiplier = await _tokenShop.getGlobalMultiplier()
    const _balanceOfBonuses = await _tokenShop.tokenBalanceCurrentBonuses()

    const multiplierInt = ethers.utils.formatUnits(multiplier, 0)
    const tokens = ethers.utils.formatUnits(countTokensCurrent, 0);
    const balanceOfBonuses = ethers.utils.formatUnits(_balanceOfBonuses, 0);
    const globalMultiplier = ethers.utils.formatUnits(_globalMultiplier, 0);
    state.balance = newBalance
    state.countTokens = countTokens
    state.countTokensCurrent = countTokensCurrent
    state.countBNB = countBNB
    state.multiplier = multiplierInt
    state.isUsedMultiplier = !!isUsedMultiplier
    state.globalMultiplier = globalMultiplier
    state._balanceOfBonuses = balanceOfBonuses
    state.totalTokens = +tokens + +balanceOfBonuses
    fsetBalance(tokens)
    fMultiplier(multiplierInt)
    fsetIsUserUseMultiplayer(isUsedMultiplier)
    fsetGlobalMultiplayer(globalMultiplier)
    await getRate()
}

export const getRate = async (state, active, getGasPrice, transTo, showError) => {
    await getGasPrice()
    const requestData = await fetch('/api/ratePrice', {
        method: 'POST'
    });
    const dataParse = await requestData.json()
    const price = dataParse.price
    let priceInWei = transTo(state.inputValue / price)
    const priceInBnb = (state.inputValue / price).toFixed(7)
    const gwei = (state.gasPrice).toString()

    if(active || state.globalMultiplier > 0){
        priceInWei = transTo(state.countTokensCurrent/10 / price)
    }

    const weiGas = ethers.utils.parseUnits(gwei, "gwei");
    const weiValue = ethers.utils.parseUnits(priceInWei, "wei");
    const totalInWei = ethers.utils.formatUnits(weiGas.add(weiValue), "ether")

    state.rate = price
    state.priceInWei = priceInWei
    state.priceInBnb = priceInBnb
    state.totalCostUSD = totalInWei

    showError('')
}

export const getGasPrice = async (state) => {
    if (state.gasPrice === 0) {
        const requestData = await fetch('/api/gasPrice', {
            method: 'POST'
        });
        const gasPrice = await requestData.json()
        state.gasPrice = gasPrice
    }
}

export const transTo = (riceInWei) => {
    const strRiceInWei = (parseFloat(riceInWei)).toFixed(18).toString()
    const wei = ethers.utils.parseEther(strRiceInWei);
    return wei.toString()
}

export const _initialize = async (selectedAddress, state, active, fsetCurrentAddress, fsetSelectAccount, _provider, _tokenShop, updateBalance, handleInput) => {
    fsetCurrentAddress(selectedAddress)
    _provider = new ethers.providers.Web3Provider(window.ethereum)
    _tokenShop = new ethers.Contract(
        tokenShopAddress.TokenShop,
        tokenShopArtifact.abi,
        _provider.getSigner(0)
    )
    fsetSelectAccount(selectedAddress)
    state.selectAccount = selectedAddress,
        async () => {
        await updateBalance()
        if (active) {
            await handleInput(state.countTokensCurrent * state.multiplier - state.countTokensCurrent)
        }
        if (state.globalMultiplier > 0) {
            await handleInput(state.countTokensCurrent * state.globalMultiplier - state.countTokensCurrent)
        }

    }

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

export const _checkNetwork = (HARDHAT_NETWORK_ID) => {
    if (window.ethereum.networkVersion === HARDHAT_NETWORK_ID) {
        return true
    }
}

export const _connectWallet = async (state, showError, _checkNetwork, _initialize, _resetState, FIRSTLY_CONNECTION) => {
    if (window.ethereum === undefined) {
        state.networkError = "Please install Metamask"

        showError("Please install Metamask")
        return
    }

    const [selectedAddress] = await window.ethereum.request({
        method: 'eth_requestAccounts'
    })

    if (!_checkNetwork()) {
        return
    }

    await _initialize(selectedAddress)

    window.ethereum.on('accountsChanged', async ([newAddress]) => {
        _resetState()
        await _initialize(newAddress)
    })

    window.ethereum.on('chainChanged', async ([networkId]) => {
        return _resetState()
    })

    localStorage.setItem(FIRSTLY_CONNECTION, 'true')
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

export const _addNetwork = async (_resetState) => {
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

export const changeAddNetwork = (_addNetwork, _addTokenToMetaMask, _connectWallet) => {
    _addNetwork().then(() => {
        _addTokenToMetaMask().then(() => {
            setTimeout(_connectWallet, 500);
        })
    });
}

export const _setNetworkError = (state, error) => {
    state.networkError = error
    state.currentError = error
}

export const handleAmount = (state, selectedAmount, getRate) => {
    state.inputValue = +selectedAmount
    getRate().then()
}

export const handleInput = async (state, value) => {
    state.inputValue = +value
    getRate().then()
}

