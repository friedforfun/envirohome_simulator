import React, { useEffect, useState } from 'react';
import { View } from 'native-base';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { deviceUsageArrProp } from '../../constants/propTypes';
import { fetchHead } from '../logic/DevicePower';
import { addDataPoint } from '../../store/actions/charts';
import {useInterval} from '../logic/useInterval';
import { validDataTypes as type } from '../../store/reducers/charts';
import { setUsageVal } from '../../store/actions/devices';

const ChartData = props => {
    const dispatch = useDispatch();
    const [now, nextRender] = useState(0)

    const realTime = async (deviceId) => {
        let fetchId;
        fetchHead(deviceId)
            .then(json => {
                if (json !== undefined){
                    return json
                }
                throw new Error("Undefined JSON from fetchHead of Device stream")
            })
            .then(json => {
                const id = json.title.split("@").slice(0, 1)[0];
                fetchId = id;
                dispatch(addDataPoint(id, json.content.data, id, type.FROM_NOW));
                dispatch(setUsageVal(json.content.data, deviceId))
            })
            .catch(error => console.log(error.message))
    }

    useInterval(() => {
       nextRender(now + 1)
    }, 4000);

    useEffect(() => {
        //console.log(props.visibleDevices)
        props.visibleDevices.map(device => realTime(device.device_id))
    }, [now])

    return (
        <View>

        </View>
    )
}

ChartData.propTypes = {
    visibleDevices: deviceUsageArrProp.deviceUsageArr
    
}


export default ChartData;