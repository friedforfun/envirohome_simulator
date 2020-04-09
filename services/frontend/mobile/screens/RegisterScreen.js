import React, { useReducer, useCallback, useRef, useState } from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon, Card } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';

import Colours from '../constants/Colours';
import RegisterUser from '../components/logic/RegisterUser';
import RegistrationInput from '../components/render/RegistrationInput';
import * as authActions from '../store/actions/auth';
import FormInput from '../components/render/FormInput';
import { handleError, regWarning } from '../components/logic/fetchFunc';


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
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    let USERNAME = useRef();
    let EMAIL = useRef();
    let PASSWORD = useRef();
    let PASSWORD_CONF = useRef();

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

    const setIsLoadingFalse = () => {
        setIsLoading(false)
    }

    const signupHandler = async () => {
        setIsLoading(true);

        await RegisterUser(formState.inputValues.username, formState.inputValues.password, formState.inputValues.email)
            .then(response => {return handleError(response)})
            .then(response => {return response.json()})
            .then(response => {
                dispatch(authActions.signup(response));
            }).then(next => {
                setIsLoadingFalse
                Alert.alert(
                    'Registration Success',
                    'Success',
                    [
                        { text: 'OK', onPress: () => { props.navigation.navigate('LoginScreen') } },
                    ],
                    { cancelable: false },
                );
            })
            .catch(error => {
                switch(error.message){
                    case "400": 
                        regWarning("Invalid username, email, or password", setIsLoadingFalse())
                        break;

                    case "409":
                        regWarning("This email or username is taken", setIsLoadingFalse())
                        break;

                    case "Network request failed":
                        console.log(error.stack)
                        regWarning("Network issue, check connection or try again", setIsLoadingFalse())
                        break;
                    default:
                        console.log("Unexpected registration error")
                        setIsLoadingFalse()
                        console.log(error.message)  
                        break;
                }
            })
        
        
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
        <KeyboardAwareScrollView style={styles.container} keyboardShouldPersistTaps={'handled'}>
            <Spinner
                visible={isLoading}
                textContent={'Registering...'}
            />
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
                        onEndEditing={() => console.log('End editing')}
                        onSubmitEditing={() => EMAIL.current.focus()}
                        textContentType="username"
                        blurOnSubmit={false}
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
                        ref={EMAIL}
                        label="Email"
                        email
                        required
                        errorText="Please enter a valid email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        onEndEditing={() => console.log('End editing')}
                        onSubmitEditing={() => PASSWORD.current.focus()}
                        initialValue=""
                        textContentType="emailAddress"
                        blurOnSubmit={false}
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
                        returnKeyType="next"
                        minLength={6}
                        onInputChange={inputChangeHandler}
                        onEndEditing={() => console.log('End editing')}
                        onSubmitEditing={() => PASSWORD_CONF.current.focus()}
                        initialValue=""
                        textContentType="newPassword"
                        blurOnSubmit={false}
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
                        ref={PASSWORD_CONF}
                        required
                        label="Re-enter password"
                        errorText="Passwords to not match"
                        keyboardType="default"
                        secureTextEntry
                        autoCapitalize="none"
                        returnKeyType="done"
                        onInputChange={inputChangeHandler}
                        onEndEditing={() => console.log('End editing')}
                        onSubmitEditing={() => console.log('Submit editing')}
                        initialValue=""
                        
                        blurOnSubmit={false}
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
                    <TouchableOpacity onPress={signupHandler}>
                            <Button title="Submit" color={Colours.center} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('LoginScreen')}>
                        <Button title="Return to login" color={Colours.left} />
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
        margin: 5
    }
});

export default RegisterScreen;