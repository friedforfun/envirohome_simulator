import URL from '../../constants/URL';

const TogglePower = async (device, token) => {
    // GET: .../api/device/<device_id>/toggle_power
    const path = URL.base + URL.api + URL.device + device.device_id + URL.togglePower;
    var myHeaders = new Headers();
    myHeaders.append("x-access-token",token)

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    } 
    return await fetch(path, requestOptions);
}

export default TogglePower;