import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import SettingsIcon from '../components/render/settings/SettingsIcon';
import RoomMenu from '../components/render/RoomMenu';
import Fetching from '../components/render/Fetching';
import GetAllRooms from '../components/logic/GetAllRooms';
import GetAllDevices from '../components/logic/GetAllDevices';
import { openSettings } from '../store/actions/settings';


const RoomScreen = props => {
    const dispatch = useDispatch();
    
    const nav = useNavigation();
    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => <TouchableOpacity><SettingsIcon action={settingsNav} /></TouchableOpacity>
        });
    }, [props.navigation])

    const settingsNav = () => {
        dispatch(openSettings())
    };

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