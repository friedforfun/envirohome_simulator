import { ROOMDATA } from '../dummyData';
import { ADD_ROOM, REMOVE_ROOM, ADD_DEVICE_TO_ROOM } from '../actions/rooms';
import Room from '../../models/room';



//? Find a better initial state
const initialState = {
    rooms: ROOMDATA
};

const RoomReducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_ROOM:
            if (state.rooms.length >= 1){
                const idArr = state.rooms.map(room => room.id);
                const newID = 1 + idArr.reduce((high, next) => { high > next ? high : next });
                const newRoom = new Room(newID, action.roomName);
                return { ...state, rooms: state.rooms.concat(newRoom) };
            } else {
                const newRoom = new Room(0, action.roomName);
                return { ...state, rooms: state.rooms.concat(newRoom) };
            }
            
        case REMOVE_ROOM:
            const getIndex = state.rooms.findIndex(room => room.id === action.roomID);
            if (getIndex >= 0){
                const tempRooms = [...state.rooms];
                tempRooms.splice(getIndex, 1);
                return { ...state, rooms: tempRooms };
            } else {
                return { ...state };
            }

        case ADD_DEVICE_TO_ROOM:
            const getRoomIndex = state.rooms.findIndex(room => room.id === action.roomID);
            const testIndex = state.rooms.findIndex(room => room.name === action.device.room);
            if (getRoomIndex === testIndex){
                const tempRooms = [...state.rooms];
                const updateRoom = tempRooms[getIndex];
                updateRoom.addDevice(action.deviceObj);
                tempRooms.splice(getIndex, 1);
                tempRooms.concat(updateRoom);
                return { ...state, rooms: tempRooms}
            } else {
                return { ...state }
            }


    }
    return state;
}

export default RoomReducer;