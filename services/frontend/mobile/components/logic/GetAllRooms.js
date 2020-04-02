import React from 'react';
import axios from 'axios';

import CallAllDevices from './CallAllDevices';
import URL from '../../constants/URL';
import Device from '../../models/device';
import Room from '../../models/room';

const GetAllRooms = () => {
    let deviceData;

    // converts fetched device data into device object
    const toDevice = obj => {
        return new Device(obj.device_id, obj.device_name, obj.device_type, obj.fault, obj.mac_addr, obj.on, obj.rated_power, obj.room)
    };

    // creates room object from device array
    const toRoom = (element, index) => { return new Room(index, element) };

    // maps device array to rooms
    const mapDeviceToRoom = (room, devices) => {
        room.deviceArray = devices.filter(device => device.room === room.name);
        return room;
    }

    const path = URL.base + URL.api + URL.alldevices

    return axios.get(path).then(response => {
        //console.log("Response: "+JSON.stringify(Response));
        if (response.data !== "unexpected end of stream") {
            return response.data.map(toDevice);
        } else {
            throw Error("Unexpected end of stream error");
        }
    }).catch(error => {
        console.log("api get request error")

    }).then(response => {
        deviceData = response;
        return response;
    }).then(response => {
        return [...new Set(response.map(item => item.room))]
    }).catch(error => {
        console.log("Error transforming response into unique rooms")

    }).then(response => {
        return response.map(toRoom)
    }).then(response => {
        let rooms = response.map(room => mapDeviceToRoom(room, deviceData))
        return rooms;
    }).catch(error => console.log("ERROR in populate Store"))

}

export default GetAllRooms;
