// action identifiers
export const ADD_ROOM = 'ADD_ROOM';
export const REMOVE_ROOM = 'REMOVE_ROOM';

// action functions
export const addRoom = (id) => {
    return { type: ADD_ROOM, roomID: id }
};

export const removeRoom = (id) => {
    return { type: REMOVE_ROOM, roomID: id }
};