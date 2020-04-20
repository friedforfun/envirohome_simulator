import React, { useEffect, useState } from 'react';
import { View } from 'native-base';
import { useDispatch } from 'react-redux';

import { fetchHead } from '../logic/DevicePower';
import { addDataPoint } from '../../store/actions/charts';
import {useInterval} from '../logic/useInterval';
import { validDataTypes as type } from '../../store/reducers/charts';
import { setUsageVal } from '../../store/actions/devices';


const ChartData = props => {
    const [now, updateNow] = useState(0);
    const dispatch = useDispatch();

    useInterval(() => {
        updateNow(now + 1);
    }, 2000);
    
    useEffect(()=>{
        const realTime = async () => {
            let fetchId;
            fetchHead(props.deviceId)
                .then(json => {
                    const id = json.title.split("@").slice(0, 1)[0];
                    fetchId = id;
                    dispatch(addDataPoint(props.deviceId, json.content.data, id, type.FROM_NOW));
                    dispatch(setUsageVal(json.content.data, props.deviceId))
                })
                .catch(error => console.log(error.message))
        }

        realTime();
    }, [now])
    

    return (
        <View>

        </View>
    )
}

export default ChartData;