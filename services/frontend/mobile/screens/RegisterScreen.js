import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';

import RegisterUser from '../components/logic/RegisterUser';
import RegistrationInput from '../components/render/RegistrationInput';

const RegisterScreen = props => {
    const [hasForm, setHasForm] = useState(false);
    const [formContent, setFormContent] = useState({ formUser: '', formEmail: '', formPassword: '' });

    const submitHandler = useCallback(() => {

    })

    const formHandler = (user, email, password) => {
        
    }

    //RegisterUser(user, password, email)
//<Image source={imageLogo} />
    return (
        <View style={styles.container}>
            
            <RegistrationInput formHandler={formHandler}/>
            <TouchableOpacity onPress={props.navigation.navigate('Login')}>
                <Text> Login </Text>
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

export default RegisterScreen;