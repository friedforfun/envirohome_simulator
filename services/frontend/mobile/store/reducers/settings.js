import { OPEN_SETTINGS, CLOSE_SETTINGS, UPDATE_MAX_RATED_POWER } from '../actions/settings';

const initialState = {
    settingsOpen: false,
    powerUsage: null,
    maxRatedPower: null,
};

const SettingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_SETTINGS:
            return { ...state, settingsOpen: true }

        case CLOSE_SETTINGS:
            return { ...state, settingsOpen: false }

        case UPDATE_MAX_RATED_POWER:
            const devicePowers = action.deviceArray.map(device => {
                return device.rated_power
            });

            const maxPower = devicePowers.reduce((sum, nextVal) => sum + nextVal, 0);

            console.log("Max rated power: "+maxPower)

            return { ...state, maxRatedPower: maxPower }

        default:
            return state;
    }
};

export default SettingsReducer;