import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const LoginScreen = props => {
console.log(props)

    return (
        <View style={styles.container}>
                <Text> The Login Screen </Text>
                <TouchableOpacity onPress={console.log(props.navigation.navigate('Register'))}>
                    <Text> Register </Text>
                </TouchableOpacity>
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