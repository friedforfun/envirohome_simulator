import React from 'react';

import URL from '../../constants/URL';


const GetAllDevices = async () => {

    const path = URL.base + URL.api + URL.alldevices;

    return await fetch(path)

}

export default GetAllDevices;
