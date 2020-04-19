export const ADD_DEVICE = 'ADD_DEVICE';
export const REMOVE_DEVICE = 'REMOVE_DEVICE';
export const POPULATE_DEVICES = 'POPULATE_DEVICES';
export const CLEAR_DEVICE_STORE = 'CLEAR_DEVICE_STORE';
export const UPDATE_DEVICE = 'UPDATE_DEVICE';
export const SET_USAGE_VAL = 'SET_USAGE_VAL';

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

