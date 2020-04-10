import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Divider, ListItem } from 'react-native-elements'

import DeviceMenu from '../components/render/DeviceMenu';

const DeviceScreen = props => {

    return (
        <View style={styles.container}>
            <ListItem 
                key={'roomName'}
                title={props.route.params.roomName}
                subtitle={"Power: "+props.route.params.roomPower}
                titleStyle={{ fontWeight: 'bold'}}
                chevron={{transform: [{rotate: '270deg'}]}}
               
            />
            <Divider style={{backgroundColor: 'black', height:2}}/>
            <ScrollView style={styles.content}>
                <DeviceMenu roomName={props.route.params.roomName} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default DeviceScreen;