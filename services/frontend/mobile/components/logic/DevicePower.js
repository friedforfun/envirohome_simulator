import URL from '../../constants/URL';


const DevicePower = async (deviceId) => {

    const path = URL.eventStore + URL.streams + URL.deviceUsage + deviceId + URL.head

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/vnd.eventstore.atom+json");
    myHeaders.append("Authorization", "Basic YWRtaW46Y2hhbmdlaXQ=");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return await fetch(path, requestOptions)
}

export default DevicePower;