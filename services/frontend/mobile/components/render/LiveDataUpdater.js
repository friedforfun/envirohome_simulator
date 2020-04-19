import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, connect } from 'react-redux';
import PropTypes, { element } from 'prop-types';

import { useInterval } from '../logic/useInterval';
import { testResponse } from '../logic/fetchFunc';
import { setUsageVal } from '../../store/actions/devices';
import DevicePower from '../logic/DevicePower';

const LiveDataUpdater = ({ deviceArray, deviceUsageArray}) => {
    const [fetchCycle, nextFetchCycle] = useState(0)

    useInterval(() => {
        nextFetchCycle(fetchCycle + 1);
    }, 2000);


    useEffect(() => {
        // loop and fetch here
        let cancel = false;
        const devicesToUpdate = deviceArray.map(element => element.isVisble === true)
        const usageToUpdate = deviceUsageArray.map(element => element.isVisble === true)
        
        if (!cancel) {
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
                    if (!cancel) {
                        updateValNow(value)
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
    }, [fetchCycle])

    useEffect(() => {

    }, [])

    return (
        <View>

        </View>
    );
}

UsageText.propTypes = {
    deviceArray: PropTypes.arrayOf(
        PropTypes.shape({
            device_id: PropTypes.number.isRequired,
            device_name: PropTypes.string.isRequired,
            is_fault: PropTypes.bool.isRequired,
            is_on: PropTypes.bool.isRequired,
            rated_power: PropTypes.number.isRequired,
            room_id: PropTypes.number.isRequired,
            type: PropTypes.string.isRequired
         })
    ).isRequired,
    deviceUsageArray: PropTypes.arrayOf(
        PropTypes.shape({
            device_id: PropTypes.number.isRequired,
            room_id: PropTypes.number.isRequired,
            usage: PropTypes.number.isRequired,
            isVisble: PropTypes.bool.isRequired
        })
    ).isRequired
}

const mapStateToProps = (state) => {
    return {
        deviceArray: state.deviceStore.devices,
        deviceUsageArray: state.deviceStore.deviceUsage
    }
}

export default connect(mapStateToProps)(LiveDataUpdater)

