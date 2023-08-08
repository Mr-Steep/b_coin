import React, {Component, Fragment} from 'react'
import {useState} from "react";

import {SwapReward} from "@/components/SwapReward";


export default function Index() {

    const [active, setActive] = useState(true);

    return (
        <Fragment>
            <SwapReward active={active} setActive={setActive}/>
        </Fragment>
    )


}
