import * as lodash from 'lodash/fp';

import { ADD_ROOM, REMOVE_ROOM, POPULATE_ROOMS, CLEAR_ROOM_STORE, UPDATE_ROOM } from '../actions/rooms';

const initialState = {
    rooms: []
};

const RoomReducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_ROOM:
            const newRoom = {
                "current_power": action.room.current_power,
                "device_count": action.room.device_count,
                "room_id": action.room.room_id,
                "room_name": action.room.room_name,
                "total_power": action.room.total_power
            }
            const checkName = state.rooms.findIndex(room => room.name === action.room_name);

            if (checkName < 0){
                const newState = state.devices.concat(newRoom);
                return { ...state, rooms: newState };
            } else {
                console.log("Room with this name already exists.");
                console.log("Existing Room: "+state.rooms[checkName]);
                console.log("New Room: "+newRoom);
                return { ...state };
            }
            
        case REMOVE_ROOM:
            const getIndex = state.rooms.findIndex(room => room.room_id === action.roomId);
            if (getIndex >= 0){
                const tempRooms = lodash.cloneDeep(state.rooms);
                const retRooms = tempRooms.splice(getIndex, 1);
                return { ...state, rooms: retRooms };
            } else {
                console.log("Room not found");
                console.log("Room ID:"+ action.room_id);
                return { ...state };
            }

        case UPDATE_ROOM:
            const updateIndex = state.rooms.findIndex(room => room.room_id === action.roomId);
            if (updateIndex >= 0){
                var tempRooms = lodash.cloneDeep(state.rooms);
                tempRooms.splice(updateIndex, 1, action.room);
                return { ...state, rooms: tempRooms }
            } else {
                console.log("Room not found.");
                console.log("Room ID:"+action.room.room_id);
                return { ...state }
            }
            
        case CLEAR_ROOM_STORE:
            return { ...state, rooms: [] }

        case POPULATE_ROOMS:
            console.log("POPULATED ROOMS")
        
            return { ...state, rooms: action.response.rooms }

        default:
            return state;
    }
}

export default RoomReducer;