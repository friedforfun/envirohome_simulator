import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://192.168.86.26:5000/api';
const DEVICES = '/devices';

//! TESTING: hardcode JWT token here
const JWTTOKEN = 0;

const AllDevices = () => {
    // state hooks
    const [result, newDevices] = useState({ isLoading: true, dataSource: [] });
    
    // update function
    const updateDeviceList = (someList) => {
        newDevices({
            isLoading: false,
            dataSource: someList
        })
    }

    const loadNew = () => {
        newDevices({
            isLoading: true,
            dataSource: result.dataSource
        })
    }

    /*
    // useEffect function to fetch data from API: /devices route
    useEffect(() => {
        const fetchData = async () => {
            const fetch = await axios(API + DEVICES);
            updateDeviceList(fetch.allDevices);
        };
        fetchData();
    }, [// Specify dependancy to run fetch again here (change of device fields) ]);*/
    
    useEffect(() => {
        loadNew();
        //axios.get(API+DEVICES, jwtToken).then(response => {
        axios.get(API + DEVICES).then(response => {
            updateDeviceList(response.data)
            console.log(response);
        })
    }, [dataSource]);
    
    return result;
}

export default AllDevices;