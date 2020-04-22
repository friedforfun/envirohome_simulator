import * as lodash from 'lodash/fp';

import { ADD_DEVICE, REMOVE_DEVICE, POPULATE_DEVICES, CLEAR_DEVICE_STORE, UPDATE_DEVICE, SET_USAGE_VAL, SET_VISIBLE, SET_HIDDEN, updateDevice } from '../actions/devices';

const initialState = {
    devices: [],
    deviceUsage: []
};

const DeviceReducer = (state = initialState, action) => {

    const getIndex = deviceId => {
        return state.devices.findIndex(device => device.device_id === deviceId)
    }

    const getUsageIndex = deviceId => {
        return state.deviceUsage.findIndex(device => device.device_id === deviceId)
    }

    const getRoomId = deviceId => {
        return state.devices.find(device => device.device_id === deviceId).room_id
    }

    switch (action.type) {
        case ADD_DEVICE:
            const newDevice = {
                "device_id": action.device.device_id,
                "device_name": action.device.device_name,
                "is_fault": action.device.is_fault,
                "is_on": action.device.is_on,
                "rated_power": action.device.rated_power,
                "room_id": action.device.room_id,
                "type": action.device.type,
                "isVisible": false,
            }
            const addIndex = getIndex(action.device_id);

            if (addIndex < 0){
                const newState = state.devices.concat(newDevice);
                return { ...state, devices: newState };
            } else {
                console.log("Device with this ID already in store.");
                console.log("Existing device: "+state.devices[addIndex].json);
                console.log("New device: "+newDevice.json);
                return { ...state };
            }
            
        case REMOVE_DEVICE:
            const removeIndex = getIndex(action.device_id);
            if (removeIndex >= 0){
                var tempDevices = lodash.cloneDeep(state.devices);
                tempDevices.splice(removeIndex, 1);
                return { ...state, devices: tempDevices }
            } else {
                console.log("Device not found.")
                console.log("Device ID: "+action.ID)
                return { ...state }
            }

        case UPDATE_DEVICE: 
            const updateIndex = getIndex(action.device.device_id);
            if (updateIndex >= 0){
                var tempDevices = lodash.cloneDeep(state.devices);
                tempDevices.splice(updateIndex, 1, action.device);
                return { ...state, devices: tempDevices }
            } else {
                console.log("Device not found.");
                console.log("Device ID: " + action.device.device_id);
                return { ...state }
            }

        case CLEAR_DEVICE_STORE:
            return { ...state, devices: [] }

        case POPULATE_DEVICES:
            console.log("POPULATED DEVICES")
            const populate = action.response.devices.map(device => {
                device.isVisible = false;
                return device;
            })
            return { ...state, devices: populate };
        
        case SET_USAGE_VAL:
            //console.log("state: "+ state)

            var mutator = lodash.cloneDeep(state.deviceUsage)
            //console.log(mutator)
            const findRoomId = getRoomId(action.deviceId)
            const usageIndex = getUsageIndex(action.deviceId)

            if (usageIndex >= 0) {
                const updatedItem = {
                    ...state.deviceUsage[usageIndex],
                    "usage": action.energy,
                }
                mutator.splice(usageIndex, 1, updatedItem)
                
            } else {
                const newItem = {
                    "device_id": action.deviceId,
                    "room_id": findRoomId,
                    "usage": action.energy,
                    "isVisible": false,
                }
                mutator.push(newItem);
            }
            return { ...state, deviceUsage: mutator }

        
        case SET_VISIBLE:
            //console.log("action device id: "+action.deviceId)
            //console.log(state.deviceUsage)
            var mutator = lodash.cloneDeep(state.deviceUsage)
            const setVisIndex = getUsageIndex(action.deviceId)
            if (setVisIndex >= 0) {
                const visibleDevice = {
                    ...state.deviceUsage[setVisIndex],
                    isVisible: true,
                }
                
                mutator.splice(setVisIndex, 1,visibleDevice);
            } else {
                const newRoomId = getRoomId(action.deviceId)

                const newVisibleItem = {
                    "device_id": action.deviceId,
                    "room_id": newRoomId,
                    "usage": 0,
                    "isVisible": true,
                }

                console.log("SET_VISIBLE - new device")
                mutator.push(newVisibleItem);
                
            }
            return {...state, deviceUsage: mutator}
 
        case SET_HIDDEN:
            var mutator = lodash.cloneDeep(state.deviceUsage)
            const setHiddenIndex = getUsageIndex(action.deviceId);
            if (setHiddenIndex >= 0) {
                const visibleDevice = {
                    ...state.deviceUsage[setHiddenIndex],
                    isVisible: false,
                }
                mutator.splice(updateIndex, 1, visibleDevice)
                return { ...state, deviceUsage: mutator}
            } else {
                console.log("Device not found.");
                console.log("Device ID: " + action.deviceId);
            }

        default:
            return { ...state };
    }
}

export default DeviceReducer;