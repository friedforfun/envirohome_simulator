class Device {
    constructor(device_id, device_name, device_type, fault, mac_addr, on, rated_power, room){
        this.id = device_id;
        this.name = device_name;
        this.type = device_type;
        this.fault = fault;
        this.mac = mac_addr;
        this.on = on;
        this.rPower = rated_power;
        this.room = room;
    }
}

export default Device;