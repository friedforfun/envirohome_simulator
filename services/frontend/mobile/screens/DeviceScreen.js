import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const DeviceScreen = props => {
    

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                <Text> The Device Screen </Text>
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