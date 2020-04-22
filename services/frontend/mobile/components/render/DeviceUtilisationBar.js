import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import UtilisationBar from './UtilisationBar';
import { fetchHead } from '../logic/DevicePower';
import { useInterval } from '../logic/useInterval';
import { setUsageVal } from '../../store/actions/devices';
import {  } from 'react';

const DeviceUtilisationBar = React.memo(props => {
    const dispatch = useDispatch()
    const [now, next] = useState(0)
    const usage = props.rawUsageVal
    
    const val = usage / props.deviceRp

    useInterval(() => {
        // fetch current total power usage from eventstore here
        next(now + 1)

    }, 1500);

    useEffect(() => {
        let cancel = false;

        const updateUsage = async () => {
            return await fetchHead(props.deviceId, "second")
                .then(json => {
                    console.log(json)
                    if (json.content.data.usage !== undefined)
                        if (!cancel) {
                            dispatch(setUsageVal(json.content.data, props.deviceId))
                        }
                })
                .catch(error => {
                    console.log(error.message)
                })
        }

        if (!cancel){
            updateUsage()
        }
        

        return () => cancel = false
    }, [now])

    return (
        <UtilisationBar 
            {...props}
            value={val}
            animationConfig={{ bounciness: 10 }}
            height={30}
        />
    );
});

DeviceUtilisationBar.defaultProps = {
    rawUsageVal: 0,
    deviceRp: 0
}

DeviceUtilisationBar.propTypes = {
    rawUsageVal: PropTypes.number.isRequired,
    deviceRp: PropTypes.number.isRequired
}


export default DeviceUtilisationBar;