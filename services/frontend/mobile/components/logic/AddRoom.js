import URL from '../../constants/URL'

const path = URL.base + URL.api + URL.room;

const AddRoom = async roomName => {
    var headers = new Headers();
    headers.append9("Content-Type", "application/json");

    const payload = JSON.stringify({
        "room_name":roomName
    });

    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: payload,
        redirect: 'follow'
    };

    return await fetch(path, requestOptions)
}

export default AddRoom;