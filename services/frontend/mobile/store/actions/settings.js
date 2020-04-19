
export const OPEN_SETTINGS = 'OPEN_SETTINGS';
export const CLOSE_SETTINGS = 'CLOSE_SETTINGS';
export const UPDATE_MAX_RATED_POWER = 'UPDATE_MAX_RATED_POWER'

export const openSettings = () => ({ 
    type: OPEN_SETTINGS 
});

export const closeSettings = () => ({
    type: CLOSE_SETTINGS
});

export const updateMaxRatedPower = devArr => ({
    type: UPDATE_MAX_RATED_POWER, deviceArray: devArr
});
