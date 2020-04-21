import { OPEN_SETTINGS, CLOSE_SETTINGS, UPDATE_MAX_RATED_POWER, UPDATE_HOUSEHOLD_POWER } from './actionIdentifiers';
export { OPEN_SETTINGS, CLOSE_SETTINGS, UPDATE_MAX_RATED_POWER, UPDATE_HOUSEHOLD_POWER } from './actionIdentifiers';

export const openSettings = () => ({ 
    type: OPEN_SETTINGS 
});

export const closeSettings = () => ({
    type: CLOSE_SETTINGS
});

export const updateMaxRatedPower = devArr => ({
    type: UPDATE_MAX_RATED_POWER, deviceArray: devArr
});

export const updateHouseholdPower = value => ({
    type: UPDATE_HOUSEHOLD_POWER, data: value
})
