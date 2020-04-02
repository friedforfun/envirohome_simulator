import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';


import RoomMenu from '../components/render/RoomMenu';
import GetAllRooms from '../components/logic/GetAllRooms';

import { populateRooms } from '../store/actions/rooms';
import { useDispatch } from 'react-redux';




const RoomScreen = props => {
    const [isLoading, setIsLoading] = useState(true);
    let roomList = useSelector(state => state.roomStore.rooms)


    const dispatch = useDispatch();

    const toggleLoading = () => {
        console.log("done")
        setIsLoading(false)
    }

    useEffect(() => {
        
        GetAllRooms().then(response => {
            console.log("dispatching...");
            dispatch(populateRooms(response));
            return response;
        }).catch(error => {
            console.log("Error here")
            console.log(error)}
        ).finally(() => {
            toggleLoading()
        });
        return () => toggleLoading();
    }, [])
    

    return (
        <View style={styles.container}>
            <Spinner
                visible={isLoading}
                textContent={'Loading...'}
            />
            <ScrollView style={styles.content}>
                {!isLoading && <RoomMenu navigation={props.navigation} rooms={roomList} />}
            </ScrollView>
        </View>
    );
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    topNav: {
        padding: 4,
        borderColor: 'black',
        borderWidth: 1,
    },
    modePicker: {
        borderColor: 'black',
        borderWidth: 1,

    }
});

export default RoomScreen;