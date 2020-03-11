import { ROOMDATA, DEVICEDATA } from '../dummyData';
import { ADD_ROOM, REMOVE_ROOM } from '../actions/rooms';
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
                return {...state, newRoom}
            }
            

        case REMOVE_ROOM:
            const getIndex = state.rooms.findIndex(room => room.id === action.roomID);
            const tempRooms = [...state.rooms];
            tempRooms.splice(getIndex, 1);
            return { ...state, rooms: tempRooms }
    }
    return state;
}

export default RoomReducer;