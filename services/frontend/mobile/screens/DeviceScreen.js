import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import DeviceMenu from '../components/render/DeviceMenu';

const DeviceScreen = props => {
    console.log(props)

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                <DeviceMenu devices={props.route.params.deviceArray} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default DeviceScreen;