import { DEVICEDATA } from '../dummyData';
import { ADD_DEVICE, REMOVE_DEVICE, POPULATE_DEVICE } from '../actions/devices';
import Device from '../../models/device';

//? Find a better initial state
const initialState = {
    devices: DEVICEDATA
};

const DeviceReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_DEVICE:
            if (state.devices.length >= 1){
                const newID = 1 + state.rooms.map(room => room.id).reduce((high, next) => { high > next ? high : next });
                const newDevice = new Device(newID, action.deviceName, action.deviceType, 'false', '', 'false', action.rPower, action.deviceRoom);
                return { ...state, devices: state.devices.concat(newDevice) };
            } else {
                const newDevice = new Device(0, action.deviceName, action.deviceType, 'false', '', 'false', action.rPower, action.deviceRoom);
                return { ...state, devices: state.devices.concat(newDevice) };
            }
            
        case REMOVE_DEVICE:
            const getIndex = state.devices.findIndex(devce => device.id === action.deviceID);
            if (getIndex >= 0){
                const tempDevices = [...state.devices]
                tempDevices.splice(getIndex, 1);
                return { ...state, devices: tempDevices }
            } else {
                return { ...state }
            }

        case POPULATE_DEVICE:
            const newDevice = new Device(action.deviceId, action.deviceName, action.deviceType, action.deviceFault, '', action.deviceOn, action.rPower, action.deviceRoom);
            if (state.devices.map(device => device.id).includes(newDevice.id)){
                return { ...state };
            } else {
                return { ...state, devices: state.devices.concat(newDevice) };
            }
            
    }
    return state;
}

export default DeviceReducer;