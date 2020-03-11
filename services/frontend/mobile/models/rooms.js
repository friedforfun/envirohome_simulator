class Room {
    power = 0;
    deviceArray = [];

    constructor(room_id, room_name){
        this.id = room_id,
        this.name = room_name
    }   

    addDevice = d =>{
        const newArray = [...this.deviceArray, d];
        this.deviceArray =  newArray;
        this.updatePower();
    }

    updatePower() {
        const powerArr = this.deviceArray.map(device => { return device.rPower });
        this.power = powerArr.reduce((total, next) => total + next);
    }
}

export default Room;