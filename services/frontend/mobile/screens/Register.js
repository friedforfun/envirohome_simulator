import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const RegisterScreen = props => {


    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                <Text> The Register Screen </Text>
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

export default RegisterScreen;