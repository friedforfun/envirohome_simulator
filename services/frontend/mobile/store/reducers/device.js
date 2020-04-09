import * as lodash from 'lodash/fp';

import { ADD_DEVICE, REMOVE_DEVICE, POPULATE_DEVICES, CLEAR_DEVICE_STORE } from '../actions/devices';

const initialState = {
    devices: []
};

const DeviceReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_DEVICE:
            const newDevice = {
                "device_id": action.device.device_id,
                "device_name": action.device.device_name,
                "device_type": action.device.device_type,
                "fault": action.device.fault,
                "on": action.device.on,
                "rated_power": action.device.rated_power,
                "room": action.device.room
            }
            const checkID = state.devices.findIndex(device => device.id === action.device_id);

            if (checkID < 0){
                const newState = state.devices.concat(newDevice);
                return { ...state, devices: newState };
            } else {
                console.log("Device with this ID already in store.");
                console.log("Existing device: "+state.devices[checkID].json);
                console.log("New device: "+newDevice.json);
                return { ...state };
            }
            
        case REMOVE_DEVICE:
            const getIndex = state.devices.findIndex(device => device.id === action.deviceId);
            if (getIndex >= 0){
                var tempDevices = lodash.cloneDeep(state.devices);
                tempDevices.splice(getIndex, 1);
                return { ...state, devices: tempDevices }
            } else {
                console.log("Device not found.")
                console.log("Device ID: "+action.ID)
                return { ...state }
            }

        case CLEAR_DEVICE_STORE:
            return { ...state, devices: [] }

        case POPULATE_DEVICES:
            console.log("POPULATED DEVICES")
            return { ...state, devices: action.deviceArray }

    }
    return state;
}

export default DeviceReducer;