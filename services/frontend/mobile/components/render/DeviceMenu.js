import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import * as _ from 'lodash/fp';

import TogglePower from '../logic/TogglePower';
import { toDevice } from '../logic/GetAllRooms';
import { removeDeviceFromRoom, addDeviceToRoom } from '../../store/actions/rooms';
import { removeDevice, addDevice, updateDevice } from '../../store/actions/devices';

const DeviceMenu = props => {

    const deviceStore = useSelector(state => state.deviceStore.devices);
    const deviceArr = deviceStore.filter(device => device.room_id === props.roomName)

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
        var tempDevice = _.cloneDeep(device)
        tempDevice.on = !tempDevice.on

        const updatedDevice = _.cloneDeep(tempDevice)

        await dispatch(updateDevice(updatedDevice));


        /*
        const tempDeviceStore = await useSelector(state => state.deviceStore.devices)
        console.log(tempDeviceStore)
        const newDeviceArr = tempDeviceStore.filter(deviceElement => deviceElement.room_id === device.room_id)
        console.log(newDeviceArr)
        */

        var mutator = _.cloneDeep(deviceArray);

        const index = deviceArray.findIndex(storDev => storDev.device_id === device.device_id)
        mutator.splice(index, 1, updatedDevice)

        updateDeviceArray(mutator)
    }


    // Create a list of devices using list.map. see: `https://react-native-elements.github.io/react-native-elements/docs/listitem.html`
    return (
        <View>
            {
                deviceArray.map((item, i) => (
                    <ListItem
                        key={i}
                        title={item.device_name}
                        subtitle={item.rated_power}
                        switch={{
                            value: item.on,
                            onValueChange: () => test(item),
                        }}
                        bottomDivider
                        chevron

                    />
                ))
            }
        </View>
    )
}

export default DeviceMenu;