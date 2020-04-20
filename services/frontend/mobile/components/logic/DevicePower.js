import URL from '../../constants/URL';
import {testResponse} from './fetchFunc';

export const fetchHead = async (deviceId) => {

    return await DevicePower(deviceId)
        .then(response => {
            return testResponse(response)
        })
        .then(ok => {
            return ok.json()
        })
        .catch(error => {
            console.log(error.message)
        })

}

export const fetchNext = async (deviceId, uriSuffix) => {

    return await DevicePower(deviceId, false, uriSuffix)
        .then(response => {
            return testResponse(response)
        })
        .then(ok => {
            return ok.json()
        })
        .catch(error => {
            console.log(error.message)
        })

}

export const fetchFirst = async (deviceId) => {

    return await DevicePower(deviceId, false, 0)
        .then(response => {
            return testResponse(response)
        })
        .then(ok => {
            return ok.json()
        })
        .catch(error => {
            console.log(error.message)
        })
}

const DevicePower = async (deviceId, getHead = true, uriSuffix = 0, unit = 'second') => {
    let path
    switch (unit) {
        case 'second':
            path = getHead ? 
                URL.eventStore + URL.streams + URL.deviceUsage + deviceId + URL.seconds + URL.head : 
                URL.eventStore + URL.streams + URL.deviceUsage + deviceId + URL.seconds+ "/" + uriSuffix;
            break;

        case 'minute':
            path = getHead ?
                URL.eventStore + URL.streams + URL.deviceUsage + deviceId + URL.mins + URL.head :
                URL.eventStore + URL.streams + URL.deviceUsage + deviceId + URL.mins + "/" + uriSuffix;
            break;

        case 'hour':
            path = getHead ?
                URL.eventStore + URL.streams + URL.deviceUsage + deviceId + URL.hours + URL.head :
                URL.eventStore + URL.streams + URL.deviceUsage + deviceId + URL.hours + "/" + uriSuffix;
            break;
        
        default:
            path = URL.eventStore + URL.streams + URL.deviceUsage + deviceId + URL.seconds + URL.head;
    }

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