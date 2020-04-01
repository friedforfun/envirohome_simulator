import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

import RoomMenu from '../components/render/RoomMenu';

const RoomScreen = props => {
    const roomList = useSelector(state => state.roomStore.rooms);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                <RoomMenu navigation={props.navigation} rooms={roomList} />
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