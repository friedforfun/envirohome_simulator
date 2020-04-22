import { ADD_DEVICE, REMOVE_DEVICE, POPULATE_DEVICES, CLEAR_DEVICE_STORE, UPDATE_DEVICE, SET_USAGE_VAL, SET_VISIBLE, SET_HIDDEN } from './actionIdentifiers';
export { ADD_DEVICE, REMOVE_DEVICE, POPULATE_DEVICES, CLEAR_DEVICE_STORE, UPDATE_DEVICE, SET_USAGE_VAL, SET_VISIBLE, SET_HIDDEN } from './actionIdentifiers';

export const addDevice = device => {
    return { 
        type: ADD_DEVICE, 
        device: device
    }
};
 
export const removeDevice = (device_id) => {
    return { type: REMOVE_DEVICE, deviceId: device_id }
};

export const updateDevice = device => {
    return { type: UPDATE_DEVICE, device: device }
}

export const clearDeviceStore = () => {
    return { type: CLEAR_DEVICE_STORE }
}

export const populateDevices = (devices) => {
    return { type: POPULATE_DEVICES, response: devices }
}

export const setUsageVal = (energy, deviceId) => {
    return { type: SET_USAGE_VAL, energy: energy, deviceId: deviceId }
}

export const hideDevice = (deviceId) => {
    return { type: SET_HIDDEN, deviceId: deviceId }
}

export const showDevice = (deviceId) => {
    return { type: SET_VISIBLE, deviceId: deviceId }
}

