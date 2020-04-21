import { HOST_IP } from 'react-native-dotenv';

const host_ip = 'http://' + HOST_IP.toString();

export default {
    base: host_ip+':5000',

    auth: '/auth',
    register: '/register',
    login: '/login',

    api: '/api',
    alldevices: '/device',
    room: '/room',
    device:'/device/',
    togglePower:'/toggle_power',

    eventStore: host_ip + ':2113',
    streams: '/streams',
    logStream: '/mobilelogstream',
    homeUsage: '/home',
    roomUsage: '/room_',
    deviceUsage: '/device_',
    head: '/head',
    seconds: '_second',
    mins: '_minute',
    hours: 'hour'
}