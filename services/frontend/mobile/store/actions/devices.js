// action identifiers
// add new device
export const ADD_DEVICE = 'ADD_DEVICE';

// populate device from backend
export const POPULATE_DEVICE = 'POPULATE_DEVICE';

// remove device
export const REMOVE_DEVICE = 'REMOVE_DEVICE';

// action functions
export const addDevice = (name, type, ratedPower, room) => {
    return { type: ADD_DEVICE, deviceName: name, deviceType: type, deviceRoom: room, power: ratedPower }
};

export const populateDevice = (id, name, type, fault, on, ratedPower, room) => {
    return { type: POPULATE_DEVICE, deviceId: id, deviceName: name, deviceType: type, deviceFault: fault, deviceOn: on, rPower: ratedPower, deviceRoom: room }
}

export const removeDevice = (id) => {
    return { type: REMOVE_DEVICE, deviceID: id }
};