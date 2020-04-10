import React, { useEffect, useState } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { useDispatch } from 'react-redux';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

import { testResponse } from '../logic/fetchFunc';
import { populateRooms, removeRoom, addRoom } from '../../store/actions/rooms';
import { populateDevices, addDevice, removeDevice } from '../../store/actions/devices';
import GetAllDevices from '../logic/GetAllDevices';



const Fetching = props => {
    /*
    Component to display spinner when fetching from backend and dispatching to redux
    props:
    props.fetchFunc - fetch function, display spinner while function is running
    props.fetchWhat - text describing what is being fetched
    props.ready - tells parent dispatch is complete
    */
    const [isLoading, setIsLoading] = useState(true);
    const [tryAgain, setTryAgain] = useState(0);
    const dispatch = useDispatch();

    const loading = bool => {
        setIsLoading(bool);
    }

    const keepTrying = () =>{
        setTryAgain( tryAgain + 1 )
    }

    const maxNumberOfTrys = 50;

    const checkStore = (what, data) => {
        
        switch (what) {
            case 'room':
                dispatch(removeRoom(data.room_name))
                break;

            case 'device':
                dispatch(removeDevice(data.device_id))
                break;

            default:
                break;
        }
        return data;
    }

    const pickAction = (what, data) => {
        switch (what) {
            case 'rooms':
                return (dispatch(populateRooms(data)))

            case 'room':
                return (dispatch(addRoom(data)))

            case 'devices':
                return (dispatch(populateDevices(data)))

            case 'device':
                return (dispatch(addDevice(data)))

            default:
                break;
        }
    }

    const retry = () => setTryAgain(0);


    useEffect(() => {
        //loading(true);
        const what = props.fetchWhat;
        
        props.fetchFunc().then(response => {
            return testResponse(response)
        })
        .then(response => {
            return response.json()
        })
        .then(json => {
            return checkStore(what, json)
        })
        .then(json => pickAction(what, json))
        .then(props.ready())
        .catch(error => {
            console.log(error.message)
            
            if (error.message === "Network request failed" && tryAgain < maxNumberOfTrys){
                keepTrying()
            } else {
                console.log(maxNumberOfTrys+" attempts to get data failed")
            }
            loading(false)
        })

    }, [tryAgain])

    return(
        <View>
            <Spinner 
                visible={isLoading}
                textContent={'...'+props.fetchWhat}
            />
            {tryAgain === maxNumberOfTrys &&
                <Icon 
                name='sync'
                type='octicon'
                size={100}
                onPress={() => retry()}
            />}
        </View>
    );

}

export default Fetching;