import { ADD_ROOM, REMOVE_ROOM, ADD_DEVICE_TO_ROOM, POPULATE_ROOMS, REMOVE_DEVICE_FROM_ROOM } from '../actions/rooms';
import Room from '../../models/room';



//? Find a better initial state
const initialState = {
    rooms: null
};

const RoomReducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_ROOM:
            if (state.rooms.length > 1){
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
            const getIndex = state.rooms.findIndex(room => room.id === action.roomID);
            const testIndex = state.rooms.findIndex(room => room.name === action.deviceObj.room);
            if (getIndex === testIndex){
                const tempRooms = [...state.rooms];
                const updateRoom = tempRooms[getIndex];
                updateRoom.deviceArray.concat(action.deviceObj)
                tempRooms.splice(getIndex, 1);
                tempRooms.concat(updateRoom);
                return { ...state, rooms: tempRooms}
            } else {
                console.log("Device add to room failed, room name and index mismatch")
                return { ...state }
            }

        case REMOVE_DEVICE_FROM_ROOM:
            const findRoom = state.rooms.findIndex(room => room.name === action.deviceObj.room);
            const checkRoom = state.rooms.findIndex(room => room.id === action.roomID)
            if (findRoom === checkRoom){
                const tempRooms = [...state.rooms];
                const findDevice = tempRooms[findRoom].deviceArray.findIndex(device => action.device.id === device.id);
                tempRooms[findRoom].deviceArray.splice(findDevice, 1);
                return {...state, rooms: tempRooms}
            } else {
                console.log("Room name and index mismatch")
                return { ...state }
            }
            

        case POPULATE_ROOMS:
            console.log("POPULATED ROOM")
            //console.log(action.roomArray);
        
            return { ...state, rooms: action.roomArray }

        default:
            return state;
    }
}

export default RoomReducer;