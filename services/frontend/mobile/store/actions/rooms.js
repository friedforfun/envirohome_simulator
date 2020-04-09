// action identifiers
export const ADD_ROOM = 'ADD_ROOM';
export const REMOVE_ROOM = 'REMOVE_ROOM';
export const POPULATE_ROOMS = 'POPULATE_ROOMS';
export const CLEAR_ROOM_STORE = 'CLEAR_ROOM_STORE';

// action functions
export const addRoom = room => {
    return { type: ADD_ROOM, room: room };
};

//! UNTIL ROOM IMPLEMENTED IN BACKEND USE NAME AS IDENTIFIER
export const removeRoom = name => {
    return { type: REMOVE_ROOM, room_name: name };
};

export const clearRoomStore = () => {
    return { type: CLEAR_ROOM_STORE };
}

export const populateRooms = (roomArr) => {
    return { type: POPULATE_ROOMS, roomArray: roomArr };
}