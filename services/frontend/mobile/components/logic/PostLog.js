import { Platform } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import Constants from 'expo-constants';

import { seed } from "../../utils/uuidSeed";
import URL from '../../constants/URL';

export const log = async (email, code, description, type="Mobile user log") => {

    PostLog(email, code, description, type)
        .then(response => {
            console.log("Log update status: " + response.status);
            return response
        })
        .catch(error => console.log('error', error));
}

const PostLog = async (email, eventId, eventDescription, type) => {

    const deviceData = {
        "device_name": Constants.deviceName,
        "device_platform:": Platform.OS,
        "device_platform_details": Constants.platform
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/vnd.eventstore.events+json");
    myHeaders.append("Authorization", "Basic YWRtaW46Y2hhbmdlaXQ=");

    const uuid = uuidv4({ random: seed() });

    var raw = JSON.stringify([{ 
        "eventId": uuid, 
        "eventType": type, 
        "data": { 
            "email": email, 
            "event_id": eventId, 
            "event_description": eventDescription ,
            "device_info": deviceData
        } 
    }]);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    
    const path = URL.eventStore + URL.streams + URL.logStream;
    console.log("PATH: "+path)
    return await fetch(path, requestOptions)
}

export default PostLog;