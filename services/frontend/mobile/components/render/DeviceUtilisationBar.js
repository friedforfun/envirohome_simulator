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

    const [valNow, updateValNow] = useState(0);
    const [render, rerender] = useState(0);

    // rated power as kwh per second
    const rpps = props.deviceRp/3600000.0;

    const dispatch = useDispatch()

    useInterval(() => {  
        rerender(render+1);
    }, 1000);

    useEffect(()=>{
        let cancel = false;
        if (!cancel){
            DevicePower(props.deviceId)
                .then(response => testResponse(response))
                .then(ok => {
                    return ok.json()
                })
                .then(json => {
                    return json.content.data.usage
                })
                .then(usage => {
                    const value = (usage) / rpps
                    if (!cancel){
                        //updateValNow(value)
                        dispatch(setUsageVal(value, props.deviceId))
                    }

                })
                .catch(error => {
                    console.log(error.message)
                })
        }
       
        return () => {
            cancel = true;
        }
    },[render])

    return (
        <UtilisationBar 
            {...props}
            value={props.rawUsageVal}
            animationConfig={{ bounciness: 10 }}
            height={30}
        />
    );

}


export default DeviceUtilisationBar;