// action identifiers
export const ADD_DEVICE = 'ADD_DEVICE';
export const REMOVE_DEVICE = 'REMOVE_DEVICE';

// action functions
export const addDevice = (name, room, ratedPower) => {
    return { type: ADD_DEVICE, deviceName: name, deviceRoom: room, power: ratedPower }
};

export const removeDevice = (id) => {
    return { type: REMOVE_DEVICE, deviceID: id }
};