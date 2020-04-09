import React from 'react';
import axios from 'axios';

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

    return fetch(path).then(response => response.json())
    .then(response => {
        //console.log("Response: "+JSON.stringify(Response));
        if (response !== "unexpected end of stream") {
            return response.map(toDevice);
        } else {
            throw Error("Unexpected end of stream error");
        }
    }).then(response => {
        deviceData = response;
        return response;
    }).then(response => {
        return [...new Set(response.map(item => item.room))]
    }).then(response => {
        return response.map(toRoom)
    }).then(response => {
        let rooms = response.map(room => mapDeviceToRoom(room, deviceData))
        return rooms;
    })

}

export default GetAllRooms;
