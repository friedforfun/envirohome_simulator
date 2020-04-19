// action identifiers
export const ADD_ROOM = 'ADD_ROOM';
export const REMOVE_ROOM = 'REMOVE_ROOM';
export const UPDATE_ROOM = 'UPDATE_ROOM';
export const POPULATE_ROOMS = 'POPULATE_ROOMS';
export const CLEAR_ROOM_STORE = 'CLEAR_ROOM_STORE';

// action functions
export const addRoom = room => {
    return { type: ADD_ROOM, room: room };
};

export const removeRoom = room_id => {
    return { type: REMOVE_ROOM, roomId: room_id };
};

export const updateRoom = room => {
    return { type: UPDATE_ROOM, room: room }
}

export const clearRoomStore = () => {
    return { type: CLEAR_ROOM_STORE };
}

export const populateRooms = (rooms) => {
    return { type: POPULATE_ROOMS, response: rooms };
}