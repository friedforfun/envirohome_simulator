import URL from '../../constants/URL';
import { testResponse } from './fetchFunc';

export const fetchHead = async (roomId) => {

    return await RoomPower(roomId)
        .then(response => {
            return testResponse(response)
        })
        .then(ok => {
            return ok.json()
        })
}

export const fetchNext = async (roomId, uriSuffix) => {

    return await RoomPower(roomId, false, uriSuffix)
        .then(response => {
            return testResponse(response)
        })
        .then(ok => {
            return ok.json()
        })
}

export const fetchFirst = async (roomId) => {

    return await RoomPower(roomId, false, 0)
        .then(response => {
            return testResponse(response)
        })
        .then(ok => {
            return ok.json()
        })
}

const RoomPower = async (roomId, getHead = true, uriSuffix = 0, unit = 'second') => {
    let path
    switch (unit) {
        case 'second':
            path = getHead ?
                URL.eventStore + URL.streams + URL.roomUsage + roomId + URL.seconds + URL.head :
                URL.eventStore + URL.streams + URL.roomUsage + roomId + URL.seconds + "/" + uriSuffix;
            break;

        case 'minute':
            path = getHead ?
                URL.eventStore + URL.streams + URL.roomUsage + roomId + URL.mins + URL.head :
                URL.eventStore + URL.streams + URL.roomUsage + roomId + URL.mins + "/" + uriSuffix;
            break;

        case 'hour':
            path = getHead ?
                URL.eventStore + URL.streams + URL.roomUsage + roomId + URL.hours + URL.head :
                URL.eventStore + URL.streams + URL.roomUsage + roomId + URL.hours + "/" + uriSuffix;
            break;

        default:
            path = URL.eventStore + URL.streams + URL.roomUsage + roomId + URL.seconds + URL.head;
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

export default RoomPower;