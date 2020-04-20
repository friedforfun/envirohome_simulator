import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import UtilisationBar from './UtilisationBar';
import { useInterval } from '../logic/useInterval';
import DevicePower from '../logic/DevicePower';
import { testResponse } from '../logic/fetchFunc';
import { setUsageVal } from '../../store/actions/devices';


const DeviceUtilisationBar = props => {

    /*
        PROPS:
            deviceId -> identifier of device
            tickRate -> time in ms between updates
            deviceRp -> device rated power
            notifyParent -> updates parent state with valNow
    */

    const val = props.rawUsageVal / props.deviceRp

    return (
        <UtilisationBar 
            {...props}
            value={val}
            animationConfig={{ bounciness: 10 }}
            height={30}
        />
    );

}


export default DeviceUtilisationBar;