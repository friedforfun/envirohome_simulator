import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import RoomMenu from '../components/render/RoomMenu';
import Fetching from '../components/render/Fetching';
import GetAllRooms from '../components/logic/GetAllRooms';
import GetAllDevices from '../components/logic/GetAllDevices';

const RoomScreen = props => {
    const [roomsReady, setRoomsReady] = useState(false);
    const [devicesReady, setDevicesReady] = useState(false);
    
    const roomsDispatched = () => {
        setRoomsReady(true)
    } 

    const devicesDispatched = () => {
        setDevicesReady(true)
    }
    
    return (
        <View style={styles.container}>
            {!roomsReady && <Fetching fetchFunc={GetAllRooms} fetchWhat={"rooms"} ready={() => roomsDispatched} />}
            {roomsReady && !devicesReady && <Fetching fetchFunc={GetAllDevices} fetchWhat={"devices"} ready={() => devicesDispatched} />}
            <ScrollView style={styles.content}>
                {roomsReady && devicesReady && <RoomMenu navigation={props.navigation} />}
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