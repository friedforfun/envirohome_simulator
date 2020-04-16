import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';

import { useInterval } from '../logic/useInterval';

const UsageText = props => {
/*
    props:
        deviceId
*/
    const getData = () => {
        const updatedUsageStore = useSelector(state => state.deviceStore.deviceUsage);
        const newUsage = updatedUsageStore.find(device => device.device_id === props.deviceId);
        if (newUsage !== undefined) {
            return newUsage.usage;
        }
        return NaN;
    }
    const [renderText, setRenderText] = useState(getData());
    const [render, rerender] = useState(0);



    useInterval(() => {
        rerender(render + 1);  
    }, 2000);

    const updateText = (val) => {
        setRenderText(val)
    }
/*
    useEffect(() => {
        let cancel = false;
        if(!cancel){
            const newUsage = getData();
            console.log(newUsage)
            if(newUsage !== undefined){
                //updateText(newUsage.usage);
            }
            
        }

        return () => {
            cancel = true
        }
    }, [])
*/
    return (
    <Text>{renderText}</Text>
    )
}

export default UsageText;