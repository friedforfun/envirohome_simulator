import URL from '../../constants/URL';

const DeleteDevice = async (deviceId) => {

    const path = URL.base + URL.api + URL.device + deviceId;

    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
        method: 'DELETE',
        headers: headers,
        redirect: 'follow'
    };

    return await fetch(path, requestOptions)

}

export default DeleteDevice;
