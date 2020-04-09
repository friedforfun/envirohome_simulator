import * as lodash from 'lodash/fp';

import { ADD_ROOM, REMOVE_ROOM, POPULATE_ROOMS, CLEAR_ROOM_STORE } from '../actions/rooms';

const initialState = {
    rooms: []
};

const RoomReducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_ROOM:
            const newRoom = {
                "id": action.room.room_id,
                "name": action.room.room_name,
                "power": action.room.room_power,
                "device_num": action.room.device_num
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
            const getIndex = state.rooms.findIndex(room => room.name === action.room_name);
            if (getIndex >= 0){
                const tempRooms = lodash.cloneDeep(state.rooms);
                const retRooms = tempRooms.splice(getIndex, 1);
                return { ...state, rooms: retRooms };
            } else {
                console.log("Room not found")
                console.log("Room name:"+ action.room_name)
                return { ...state };
            }

        case CLEAR_ROOM_STORE:
            return { ...state, rooms: [] }

        case POPULATE_ROOMS:
            console.log("POPULATED ROOMS")
        
            return { ...state, rooms: action.roomArray }

        default:
            return state;
    }
}

export default RoomReducer;