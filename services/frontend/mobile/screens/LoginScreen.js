import React, { useReducer, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon, Card } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import FormInput from '../components/render/FormInput';
import Colours from '../constants/Colours';
import * as authActions from '../store/actions/auth';
import LoginUser from '../components/logic/LoginUser';


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE){
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities){
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


const LoginScreen = props => {
    const dispatch = useDispatch();

    let USERNAME = useRef();
    let PASSWORD = useRef();

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
            await LoginUser(formState.inputValues.username, hashedPassword)
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
        <KeyboardAwareScrollView style={styles.container}>
            <Card style={styles.authContainer}>
                <FormInput 
                    id="username"
                    ref={USERNAME}
                    label="Username"
                    required
                    errorText="Please enter a valid username"
                    autoCapitalize="none"
                    returnKeyType="next"
                    initialValue=""
                    onInputChange={inputChangeHandler}
                    onSubmitEditing={() => PASSWORD.current.focus()}
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
                    id="password"
                    ref={PASSWORD}
                    required
                    label="Password"
                    errorText="Please enter a valid password"
                    keyboardType="default"
                    secureTextEntry
                    autoCapitalize="none"
                    returnKeyType="done"
                    minLength={6}
                    onInputChange={inputChangeHandler}
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
                        <Button title="Login" color={Colours.center} onPress={signupHandler} />
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity>
                        <Button title="Register" color={Colours.left} onPress={() => props.navigation.navigate('RegisterScreen')} />
                    </TouchableOpacity>
                </View>
            </Card>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    authContainer: {
        width: '100%',
        maxWidth: 450,
        maxHeight: 450,
        padding: 5
    },
    buttonContainer: {
        minWidth: 250,
        marginTop: 10
    },
    iconStyle: {
        marginRight: 5,
    }
});

export default LoginScreen;