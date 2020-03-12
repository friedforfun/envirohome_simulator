import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

import RoomMenu from './RoomMenu';
import DeviceMenu from './DeviceMenu';
import SettingsMenu from './SettingsMenu';
import { DEVICEDATA } from '../../store/dummyData';

const deviceList = [
    {
        title: 'Light',
        power: true,
    },
    {
        title: 'TV',
        power: true,
    },
    {
        title: 'Speakers',
        power: true,
    },
    {
        title: 'Plug',
        power: true,
    }
]



const chooseContent = page => {
    // access redux store to get list of rooms
    const roomList = useSelector(state => state.roomStore.rooms)



    switch (page) {
        case 'roomList':
            return (
                <View>
                    <RoomMenu rooms={roomList} />
                    <DeviceMenu devices={DEVICEDATA} />
                </View>
            );
        case 'map':
            return (
                <Text>Render map page here.</Text>
            );
        case 'settings':
            return (
                <SettingsMenu />
            );
        default:
            return (
                <Text>Render default here.</Text>
            );

    }

};

const ContentRenderer = props => {
    /*
        props:
            page -> identifies content to render
    */
    return(
        <ScrollView style={styles.content}>
            { chooseContent(props.page) }
        </ScrollView>
        
    );
}
const styles = StyleSheet.create({
    content: {
        flex: 20
    },
});

export default ContentRenderer;