
export const OPEN_SETTINGS = 'OPEN_SETTINGS';
export const CLOSE_SETTINGS = 'CLOSE_SETTINGS';

export const openSettings = () => {
    console.log("Dispatching open settings")
    return { type: OPEN_SETTINGS }
};

export const closeSettings = () => ({
    type: CLOSE_SETTINGS
});
