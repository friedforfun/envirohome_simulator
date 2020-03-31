import axios from 'axios';

import URL from '../../constants/URL';

const AllDevices = token => {
    const deviceCall = axios.create({
        baseURL: URL.base,
        headers: {
            'Content-Type': 'application/json',
            'Connection': 'close'
        }
    });

    const path = URL.api + URL.alldevices;

    return deviceCall({
        method: 'get',
        timeout: 8000,
        url: path
    })


}

export default AllDevices;