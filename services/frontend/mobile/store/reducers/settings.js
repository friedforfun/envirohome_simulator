import { OPEN_SETTINGS, CLOSE_SETTINGS } from '../actions/settings';

const initialState = {
    settingsOpen: false
};

const SettingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_SETTINGS:
            console.log("Opening Settings")
            return { ...state, settingsOpen: true }

        case CLOSE_SETTINGS:
            return { ...state, settingsOpen: false }

        default:
            return state;
    }
};

export default SettingsReducer;