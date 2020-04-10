import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import RoomMenu from '../components/render/RoomMenu';
import Fetching from '../components/render/Fetching';
import GetAllDevices from '../components/logic/GetAllDevices';

const RoomScreen = props => {
    const [reduxReady, setReduxReady] = useState(false);

    
    const dispatchComplete = () => {
        setReduxReady(true)
    } 
    
    //! CHANGE <FETCHING /> TO GET ALL ROOMS
    return (
        <View style={styles.container}>
            {!reduxReady && <Fetching fetchFunc={GetAllDevices} fetchWhat={"devices"} ready={() => dispatchComplete} />}
            <ScrollView style={styles.content}>
                {reduxReady && <RoomMenu navigation={props.navigation} />}
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