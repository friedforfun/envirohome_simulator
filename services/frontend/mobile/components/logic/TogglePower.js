import URL from '../../constants/URL';

const TogglePower = device => {
    const path = URL.base + URL.api + URL.togglePower + device.id;

    return fetch(path).then(response => response.json());
}

export default TogglePower;