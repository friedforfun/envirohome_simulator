import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import RoomMenu from './RoomMenu';
import DeviceMenu from './DeviceMenu';

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

const roomList = [
    {
        title: 'Living Room',
    },
    {
        title: 'Kitchen',
    },
    {
        title: 'Bedroom',
    },
    {
        title: 'Bathroom',
    }
]

const chooseContent = page => {
    switch (page) {
        case 'roomList':
            return (
                <View>
                    <RoomMenu rooms={roomList} />
                    <DeviceMenu devices={deviceList} />
                </View>
            );
        case 'map':
            return (
                <Text>Render map page here.</Text>
            );
        case 'settings':
            return (
                <Text>Render settings page here.</Text>
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