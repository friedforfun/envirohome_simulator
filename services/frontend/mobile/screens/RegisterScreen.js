import React, { useReducer, useCallback } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

import Colours from '../constants/Colours';
import RegisterUser from '../components/logic/RegisterUser';
import RegistrationInput from '../components/render/RegistrationInput';
import * as authActions from '../store/actions/auth';
import FormInput from '../components/render/FormInput';


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

const RegisterScreen = props => {
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            username: '',
            email: '',
            password: ''
        },
        inputValidities: {
            username: false,
            email: false,
            password: false
        },
        formIsValid: false
    });

    const signupHandler = async () => {
        try {
            await RegisterUser(formState.inputValues.username, formState.inputValues.password, formState.inputValues.email)
                .then(response => dispatch(authActions.signup(response)))
        } catch (err) {
            console.log("ERROR! - User registration")
            // if unexpected end of stream: get user-id and dispatch in signup 
            console.log(err)
        }
    }

    const inputChangeHandler = useCallback((id, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: id
        });
    }, [dispatchFormState]);

    return (
        <KeyboardAvoidingView style={styles.container}>
            <FormInput
                id="username"
                label="Username"
                required
                errorText="Please enter a valid username"
                autoCapitalize="none"
                returnKeyType="next"
                initialValue=""
                onInputChange={inputChangeHandler}
                onEndEditing={() => console.log('End editing')}
                onSubmitEditing={() => console.log('Submit editing')}
                leftIcon={
                    <Icon
                        name='person'
                        type='octicon'
                        size={24}
                        iconStyle={styles.iconStyle}
                    />
                }
            />
            <FormInput
                id="email"
                label="Email"
                email
                required
                errorText="Please enter a valid email"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                onInputChange={inputChangeHandler}
                onEndEditing={() => console.log('End editing')}
                onSubmitEditing={() => console.log('Submit editing')}
                initialValue=""
                leftIcon={
                    <Icon
                        name='mail'
                        type='octicon'
                        size={24}
                        iconStyle={styles.iconStyle}
                    />
                }
            />
            <FormInput
                id="password"
                required
                label="Password"
                errorText="Please enter a valid password"
                keyboardType="default"
                secureTextEntry
                autoCapitalize="none"
                returnKeyType="next"
                minLength={6}
                onInputChange={inputChangeHandler}
                onEndEditing={() => console.log('End editing')}
                onSubmitEditing={() => console.log('Submit editing')}
                initialValue=""
                leftIcon={
                    <Icon
                        name='lock'
                        type='octicon'
                        size={20}
                        iconStyle={styles.iconStyle}
                    />
                }
            />
            <FormInput
                id="password2"
                required
                label="Re-enter password"
                errorText="Passwords to not match"
                keyboardType="default"
                secureTextEntry
                autoCapitalize="none"
                returnKeyType="done"
                minLength={6}
                onInputChange={inputChangeHandler}
                onEndEditing={() => console.log('End editing')}
                onSubmitEditing={() => console.log('Submit editing')}
                initialValue=""
                leftIcon={
                    <Icon
                        name='lock'
                        type='octicon'
                        size={24}
                        iconStyle={styles.iconStyle}
                    />
                }
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity>
                    <Button title="Submit" color={Colours.center} onPress={signupHandler} />
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity>
                    <Button title="Return to login" color={Colours.left} onPress={() => { }} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        marginTop: 10
    },
    iconStyle: {
        margin: 5
    }
});

export default RegisterScreen;