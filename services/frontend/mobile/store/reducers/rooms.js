import { DATA } from '../dummyData';

//! functions to parse the temp dummy data ---
const extractRoom = obj => {
    return { title: obj.room }
}
const roomList = DATA.map(extractRoom);
const uniqueRooms = Array.from(new Set(roomList));
 //! ---------------------------------------------


//? Find a better initial state
const initialState = {
    rooms: uniqueRooms
};

const RoomReducer = (state = initialState, action) => {
    return state;
}

export default RoomReducer;