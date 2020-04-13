import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import * as _ from 'lodash/fp';
import { v4 as uuidv4 } from 'uuid';

import { seed } from "../../utils/uuidSeed";
import TogglePower from '../logic/TogglePower';
import { updateDevice } from '../../store/actions/devices';
import { testResponse } from '../logic/fetchFunc';
import Chart from './Chart';
import { log } from '../logic/PostLog';

const DeviceMenu = props => {
    const [deviceExpanded, setDeviceExpanded] = useState([])

    const deviceStore = useSelector(state => state.deviceStore.devices);
    const deviceArr = deviceStore.filter(device => device.room_id === props.roomId)

    const [deviceArray, updateDeviceArray] = useState(deviceArr)
    /*
        props:
            roomName
            roomID
            deviceArray -> list of devices
    */
    const dispatch = useDispatch();
    const email = useSelector(state => state.authStore.email)

    const togglePower = async device => {

        

        TogglePower(device)
            .then(response => {
                return testResponse(response)
            })
            .then(response => {
                return response.json();
            })
            .then(json => {
                if(json.success){
                    const powerVal = device.is_on ? "False" : "True";
                    if (json.success === "device ID: "+device.device_id+" power is now "+powerVal) {
                        console.log("Power toggle sucess");
                        log(email, 3, device.device_name + " power toggled (ID: " + device.device_id + ")", device.device_id+"_power_toggled")
                        return powerVal;
                    }else {
                        throw new Error("Client and server out of sync");
                    }
                }else {
                    console.log(json)
                    throw new Error("Undefined toggle power error");
                }
            })
            .then(powerState => {
                var tempDevice = _.cloneDeep(device)
                const onVal = powerState === "True" ? true : false;
                tempDevice.is_on = onVal;
                return tempDevice;
            })
            .then(tDevice =>{
                const updatedDevice = _.cloneDeep(tDevice);
                dispatch(updateDevice(updatedDevice));
                var mutator = _.cloneDeep(deviceArray);
                const index = deviceArray.findIndex(storDev => storDev.device_id === device.device_id)
                mutator.splice(index, 1, updatedDevice)
                return mutator;
            })
            .then(newArray =>{
                updateDeviceArray(newArray);
            })     
            .catch(error => {
                console.log(error.message);
            })
    }

    const expandDevice = device => {
        if (deviceExpanded.includes(device.device_id)){
            const deviceIndex = deviceExpanded.findIndex(id => id === device.device_id)
            var newExpansionArray = _.cloneDeep(deviceExpanded);
            newExpansionArray.splice(deviceIndex, 1);
            setDeviceExpanded(newExpansionArray);
        } else {
            var newExpansionArray = deviceExpanded.concat(device.device_id);
            setDeviceExpanded(newExpansionArray);
        }
    }


    // Create a list of devices using list.map. see: `https://react-native-elements.github.io/react-native-elements/docs/listitem.html`
    return (
        <View>
            {
                deviceArray.map((item, i) => (
                    <View key={uuidv4({ random: seed() })}>
                        <ListItem
                            key={uuidv4({ random: seed() })}
                            title={item.device_name}
                            subtitle={"Power: "+item.rated_power}
                            switch={{
                                value: item.is_on,
                                onValueChange: () => togglePower(item),
                            }}
                            bottomDivider
                            chevron
                            onPress={() => expandDevice(item)}
                        />
                        {deviceExpanded.includes(item.device_id) && <Chart device={item} key={uuidv4({ random: seed() })}/>}
                    </View>
                ))
            }
        </View>
    )
}

export default DeviceMenu;