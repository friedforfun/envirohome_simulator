import URL from '../../constants/URL';

const GetAllRooms = async () => {

    const path = URL.base + URL.api + URL.room;

    return await fetch(path)

}

export default GetAllRooms;
