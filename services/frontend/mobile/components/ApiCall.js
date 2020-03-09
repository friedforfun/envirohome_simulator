import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://192.168.86.26:5000/api';
const DEVICES = '/devices';

const ApiCall = props => {
    // state hooks
    const [result, newDevices] = useState({ isLoading: true, dataSource: [] });
    
    // update function
    const updateDeviceList = (someList) => {
        newDevices({
            isLoading: false,
            dataSource: someList
        })
    }

    // useEffect function to fetch data from API: /devices route
    useEffect(() => {
        const fetchData = async () => {
            const fetch = await axios(API + DEVICES);
            updateDeviceList(fetch.allDevices);
        };
        fetchData();
    }, [/* Specify dependancy to run fetch again here (change of device fields) */]);
    

    return (
        
        { result }
    );
}

export default ApiCall;