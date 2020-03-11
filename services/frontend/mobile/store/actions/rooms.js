// action identifiers
export const ADD_ROOM = 'ADD_ROOM';
export const REMOVE_ROOM = 'REMOVE_ROOM';

// action functions
export const addRoom = (name) => {
    return { type: ADD_ROOM, roomName: name }
};

export const removeRoom = (id) => {
    return { type: REMOVE_ROOM, roomID: id }
};