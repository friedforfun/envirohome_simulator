import Device from '../models/device';

const rawData = [
    {
        "device_id": 0,
        "device_name": "Living Room TV",
        "device_type": "tv",
        "fault": false,
        "mac_addr": "",
        "on": true,
        "rated_power": 700,
        "room": "living_room"
    },
    {
        "device_id": 1,
        "device_name": "Outside Lights",
        "device_type": "lights",
        "fault": false,
        "mac_addr": "",
        "on": true,
        "rated_power": 40,
        "room": "outside"
    },
    {
        "device_id": 2,
        "device_name": "Bedroom 1 Lights",
        "device_type": "lights",
        "fault": false,
        "mac_addr": "",
        "on": true,
        "rated_power": 40,
        "room": "bedroom_1"
    },
    {
        "device_id": 3,
        "device_name": "Bedroom 2 Lights",
        "device_type": "lights",
        "fault": false,
        "mac_addr": "",
        "on": true,
        "rated_power": 40,
        "room": "bedroom_2"
    },
    {
        "device_id": 4,
        "device_name": "Kitchen Lights",
        "device_type": "lights",
        "fault": false,
        "mac_addr": "",
        "on": true,
        "rated_power": 40,
        "room": "kitchen"
    },
    {
        "device_id": 5,
        "device_name": "Living Room Lights 1",
        "device_type": "lights",
        "fault": false,
        "mac_addr": "",
        "on": true,
        "rated_power": 40,
        "room": "living_room"
    },
    {
        "device_id": 6,
        "device_name": "Living Room Lights 2",
        "device_type": "lights",
        "fault": false,
        "mac_addr": "",
        "on": true,
        "rated_power": 40,
        "room": "living_room"
    },
    {
        "device_id": 7,
        "device_name": "Bathroom 1 Lights",
        "device_type": "lights",
        "fault": false,
        "mac_addr": "",
        "on": true,
        "rated_power": 40,
        "room": "bathroom_1"
    },
    {
        "device_id": 8,
        "device_name": "Kitchen Plug",
        "device_type": "plug",
        "fault": true,
        "mac_addr": "",
        "on": true,
        "rated_power": 500,
        "room": "kitchen"
    }
]


const toDevice = obj => {
    return new Device(obj.device_id, obj.device_name, obj.device_type, obj.fault, obj.mac_addr, obj.on, obj.rated_power, obj.room)
};

export const DATA = rawData.map(toDevice)
