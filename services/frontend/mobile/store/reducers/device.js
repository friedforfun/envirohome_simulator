import * as lodash from 'lodash/fp';

import { ADD_DEVICE, REMOVE_DEVICE, POPULATE_DEVICES, CLEAR_DEVICE_STORE, UPDATE_DEVICE } from '../actions/devices';

const initialState = {
    devices: []
};

const DeviceReducer = (state = initialState, action) => {
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
            }
            const addIndex = state.devices.findIndex(device => device.device_id === action.device_id);

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
            const removeIndex = state.devices.findIndex(device => device.device_id === action.deviceId);
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
            
            const updateIndex = state.devices.findIndex(device => device.device_id === action.device.device_id);
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
            return { ...state, devices: action.response.devices }

    }
    return state;
}

export default DeviceReducer;