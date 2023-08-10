import React, {Fragment, useState} from 'react'

import {Admin} from "@/components/admin";
import data from "@/assets/bNXTdata";


export default function Index() {

    const [modalVisible, setModalVisible] = useState(false);
    const [selectAccount, setSelectAccount] = useState(null);
    const [active, setActive] = useState(false);
    const [step, setStep] = useState(0);
    const [getBalance, setBalance] = useState(0);
    const [getMultiplier, setMultiplier] = useState(0);
    const [getCurrentAddress, setCurrentAddress] = useState(0)
    const [getTransactionComplete, setTransactionComplete] = useState(0)
    const [getIsUserUseMultiplayer, setIsUserUseMultiplayer] = useState(0)
    const [getGlobalMultiplayer, setGlobalMultiplayer] = useState(0);
    const [getConfirmationComplete, setConfirmationComplete] = useState(false);
    const [getHash, setHash] = useState(null);

    return (
        <Fragment>
            <Admin
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
        </Fragment>
    )


}
