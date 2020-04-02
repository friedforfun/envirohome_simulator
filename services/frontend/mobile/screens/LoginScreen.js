import React, { useReducer, useCallback, useRef, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon, Card } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';

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
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    let EMAIL = useRef();
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

    const loginHandler = async () => {
        setIsLoading(true)
        try {
            await LoginUser(formState.inputValues.email, formState.inputValues.password)
                .then(response => {
                    if (response.data.token) dispatch(authActions.login(response));
                    else {
                        console.log("Undefined response");
                        setIsLoading(false);
                    }
                });
        } catch (err) {
            console.log("ERROR! - User registration")
            // if unexpected end of stream: get user-id and dispatch in signup 
            console.log(err)
            setIsLoading(false);
        } finally {
            //setIsLoading(false); // move this inside of the error catch before the alert
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
            <Spinner
                visible={isLoading}
                textContent={'Logging in...'}
            />
            <Card style={styles.authContainer}>
                <FormInput 
                    id="email"
                    ref={EMAIL}
                    label="Email"
                    required
                    email
                    errorText="Please enter a valid email"
                    autoCapitalize="none"
                    returnKeyType="next"
                    initialValue=""
                    onInputChange={inputChangeHandler}
                    onSubmitEditing={() => PASSWORD.current.focus()}
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
                    onSubmitEditing={() => loginHandler}
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
                        <Button title="Login" color={Colours.center} onPress={loginHandler} />
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