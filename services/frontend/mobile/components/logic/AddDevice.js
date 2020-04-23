import URL from '../../constants/URL'



const AddDevice = async (type, name, ratedPower, roomId, isGenerator = false, isFault = false, isOn = false) => {

    const path = URL.base + URL.api + URL.device + type;

    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    const payload = JSON.stringify({
        "device_name": name,
        "rated_power": ratedPower,
        "is_fault": isFault,
        "is_on": isOn,
        "room_id": roomId,
        "is_generator": isGenerator
    });

    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: payload,
        redirect: 'follow'
    };

    return await fetch(path, requestOptions)
}

export default AddDevice;