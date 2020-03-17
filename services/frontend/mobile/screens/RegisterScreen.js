import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Image } from 'react-native';

import RegisterUser from '../components/logic/RegisterUser';
import RegistrationInput from '../components/render/RegistrationInput';

const RegisterScreen = props => {
    const [hasForm, setHasForm] = useState(false);
    const [formContent, setFormContent] = useState({ formUser: '', formEmail: '', formPassword: '' });

    const submitHandler = useCallback(() => {

    })

    const formHandler = (user, email, password) => {
        
    }

    RegisterUser(user, password, email)

    return (
        <View style={styles.container}>
            <Image source={imageLogo} />
            <RegistrationInput formHandler={formHandler}/>
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