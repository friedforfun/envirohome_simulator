import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const LoginScreen = props => {


    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                <Text> The Login Screen </Text>
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

export default LoginScreen;