import React, { useEffect, useState } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import { testResponse } from '../logic/fetchFunc';
import { populateRooms, removeRoom, addRoom } from '../../store/actions/rooms';
import { populateDevices, addDevice, removeDevice } from '../../store/actions/devices';
import { updateMaxRatedPower } from '../../store/actions/settings';



const Fetching = props => {
    /*
    Component to display spinner when fetching from backend and dispatching to redux
    props:
    props.fetchFunc - fetch function, display spinner while function is running
    props.fetchWhat - text describing what is being fetched
    props.ready - tells parent dispatch is complete
    props.updateParentState - parent component state update function
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

            case 'logs':
                props.updateParentState(data)

            default:
                break;
        }
    }


    const deviceArray = useSelector(state => state.deviceStore.devices);
    const updatePowerStore = () => {
        if (deviceArray !== []){
            dispatch(updateMaxRatedPower(deviceArray));
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
        .then(() => {
            if (["rooms", "room", "devices", "device"].includes(what))
                updatePowerStore();
        })
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
                <View>
                    <Icon 
                        name='sync'
                        type='octicon'
                        size={100}
                        onPress={() => retry()}
                    />
                    <Text>Try again?</Text>
                </View>}
        </View>
    );

}

export default Fetching;