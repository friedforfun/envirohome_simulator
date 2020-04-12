import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import * as _ from 'lodash/fp';

import TogglePower from '../logic/TogglePower';
import { toDevice } from '../logic/GetAllRooms';
import { updateDevice } from '../../store/actions/devices';
import { testResponse } from '../logic/fetchFunc';
import Chart from './Chart';

const DeviceMenu = props => {
    const [deviceExpanded, setDeviceExpanded] = useState([0])

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

    const togglePower = async (device) => {
        let nextDeviceState;
        useEffect(() => {
            let updatedDevice;
            TogglePower(device)
                .then(response => { return toDevice(response) })
                .then(response => updatedDevice = response)
                .then(() => {
                    removeDeviceFromRoom(props.roomID, device)
                })
                .then(() => {
                    addDeviceToRoom(props.roomID, updatedDevice)
                })
                .then(() => {
                    return useSelector(state => state.roomStore.rooms);
                })
                .then(selector => {
                    return selector[selector.findIndex(room => room.id === props.roomID)].deviceArray;
                })
                .then(result => {
                    nextDeviceState = result;
                })
                .catch(error => {
                    console.log("An error has occured");
                    console.log(error.message);
                })
        } ,[])
        await updateDeviceArray(nextDeviceState)
    }

    const test = async device => {

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


    // Create a list of devices using list.map. see: `https://react-native-elements.github.io/react-native-elements/docs/listitem.html`
    return (
        <View>
            {
                deviceArray.map((item, i) => (
                    <View>
                        <ListItem
                            key={i}
                            title={item.device_name}
                            subtitle={"Power: "+item.rated_power}
                            switch={{
                                value: item.is_on,
                                onValueChange: () => test(item),
                            }}
                            bottomDivider
                            chevron
                            onPress={() => {}}
                        />
                        { deviceExpanded.includes(item.device_id) && <Chart device={item} />}
                    </View>
                ))
            }
        </View>
    )
}

export default DeviceMenu;