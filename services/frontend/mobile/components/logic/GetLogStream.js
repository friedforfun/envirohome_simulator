import URL from '../../constants/URL';

const path = URL.eventStore + URL.streams + URL.logStream 

const GetLogStream = async (streamURI = path) => {

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/vnd.eventstore.atom+json");
    myHeaders.append("Authorization", "Basic YWRtaW46Y2hhbmdlaXQ=");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return await fetch(streamURI, requestOptions)
}

export default GetLogStream;