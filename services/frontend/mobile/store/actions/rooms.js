import { ADD_ROOM, REMOVE_ROOM, UPDATE_ROOM, POPULATE_ROOMS, CLEAR_ROOM_STORE } from './actionIdentifiers';
export { ADD_ROOM, REMOVE_ROOM, UPDATE_ROOM, POPULATE_ROOMS, CLEAR_ROOM_STORE } from './actionIdentifiers';

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