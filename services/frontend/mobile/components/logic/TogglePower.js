import URL from '../../constants/URL';

const TogglePower = async device => {
    // GET: .../api/device/<device_id>/toggle_power
    const path = URL.base + URL.api + URL.device + device.device_id + URL.togglePower;

    return await fetch(path);
}

export default TogglePower;