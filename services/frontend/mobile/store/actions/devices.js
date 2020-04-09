export const ADD_DEVICE = 'ADD_DEVICE';
export const REMOVE_DEVICE = 'REMOVE_DEVICE';
export const POPULATE_DEVICES = 'POPULATE_DEVICES';
export const CLEAR_DEVICE_STORE = 'CLEAR_DEVICE_STORE';

export const addDevice = device => {
    return { 
        type: ADD_DEVICE, 
        device: device
    }
};
 
export const removeDevice = (id) => {
    return { type: REMOVE_DEVICE, deviceID: id }
};

export const clearDeviceStore = () => {
    return { type: CLEAR_DEVICE_STORE }
}

export const populateDevices = (deviceArr) => {
    return { type: POPULATE_DEVICES, deviceArray: deviceArr }
}

