import URL from '../../constants/URL';

const DeleteRoom = async (roomId) => {

    const path = URL.base + URL.api + URL.room + "/" + roomId;

    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
        method: 'DELETE',
        headers: headers,
        redirect: 'follow'
    };

    return await fetch(path, requestOptions)

}

export default DeleteRoom;
