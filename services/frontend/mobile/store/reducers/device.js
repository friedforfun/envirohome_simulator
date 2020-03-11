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

        case REMOVE_DEVICE:

        case POPULATE_DEVICE:
            const newDevice = new Device(action.deviceId, action.deviceName, action.deviceType, action.deviceFault, '', action.deviceOn, action.rPower, action.deviceRoom);
            
    }
    return state;
}

export default DeviceReducer;