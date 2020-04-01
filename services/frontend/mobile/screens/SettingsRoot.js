import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import SettingsMenu from '../components/render/SettingsMenu';


const SettingsScreen = props => {


    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                <SettingsMenu />
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

export default SettingsScreen;