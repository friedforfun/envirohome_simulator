import React, { useState, useReducer, useCallback } from 'react';
import { Overlay } from 'react-native-elements';
import { View, Button, StyleSheet, Alert} from 'react-native';
import { Card, CardItem, Body, Text } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import FormInput from '../FormInput';
import Colours from '../../../constants/Colours';
import AddRoom from '../../logic/AddRoom';
import { testResponse } from '../../logic/fetchFunc';
import { log } from '../../logic/PostLog';

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
        }
        let updatedFormIsValid = true;
        for (const key in updatedValidities){
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        }
    }
    return state;
}

const AddRoomPopup = props => {
    const [confirmation, setConfirmation] = useState(false)
    const userEmail = useSelector(state => state.authStore.email)
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            roomName: ''
        },
        inputValidities: {
            roomName: false
        },
        formIsValid: false
    });

    const inputChangeHandler = useCallback((id, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: id
        })
    }, [dispatchFormState])

    const clearForm = () => {
        inputChangeHandler("roomName", '', false, false)
    }

    const confirmationDialog = () => {
        if (confirmation) {
            clearForm()
        }
        if (formState.formIsValid){
            setConfirmation(confirmation ? false : true)
        } else {
            Alert.alert(
                'Invalid room name',
                'Please provide a room name with at least 3 characters',
                [
                    { text: 'OK', onPress: () => { console.log("Confirm") } },
                ],
                { cancelable: false },
            );
        }

        
    }

    const closeOverlay = () => {
        clearForm()
        props.visHandler(false)
        setConfirmation(false)
        props.refresh()
    }

    const submitForm = () => {
        console.log("Submitting form...")
        AddRoom(formState.inputValues.roomName)
            .then(Response => {
                return testResponse(Response)
            })
            .then(ok => {
                return ok.json()
            })
            .then(json => {
                console.log(json)
                if(json.success){
                    log(userEmail, 5, "Room sucessfully added: "+formState.inputValues.roomName+"\nResponse:"+json.success,  "Room added")
                    log()
                    Alert.alert(
                        'Success',
                        json.success,
                        [
                            { text: 'OK', onPress: () => closeOverlay() },
                        ],
                        { cancelable: false },
                    );
                }
            })
            .catch(error => {
                console.log(error.message)
                if (error.message === "Network request failed"){
                    log(userEmail, 5, "Room "+formState.inputValues.roomName+" was added with the error: Network request failed.", "Room added")
                    Alert.alert(
                        'Network request failed',
                        'Invalid response from server, this may indicate a problem with your network. Please refresh the page.',
                        [
                            { text: 'OK', onPress: () => {
                                closeOverlay() 
                                }
                            },
                        ],
                        { cancelable: false },
                    );
                }
            })
    }

    return(
        <Overlay
            animationType="fade"
            borderRadius={0}
            height={300}
            isVisible={props.visible}
            onBackdropPress={() => closeOverlay()}
            overlayBackgroundColor="rgba(0, 0, 0, 0.5)"
        >
            <Card style={{flex:0, height: 270}}>
               {!confirmation && 
                    <View style={styles.content}>
                    <CardItem style={styles.buttonCard}>
                            <Body>
                                <Text>Create a new room</Text>
                               
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <FormInput
                                id="roomName"
                                label="Room name"
                                required
                                errorText="Please supply at least 3 characters"
                                autoCapitalize="none"
                                returnKeyType="done"
                                keyboardType="default"
                                initialValue=""
                                minLength={3}
                                onInputChange={inputChangeHandler}
                                onEndEditing={() => { }}
                                onSubmitEditing={() => console.log("Submit form")}
                            />
                            </Body>
                        </CardItem>
                        <CardItem style={{ alignSelf: 'flex-end' }}>
                            <Body>
                                <View style={styles.controls}>
                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity onPress={() => confirmationDialog()}>
                                            <Button title="Confirm" color={Colours.right} onPress={() => confirmationDialog()} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.buttonContainer}>
                                    <TouchableOpacity onPress={() => closeOverlay()}>
                                        <Button title="Cancel" color={Colours.left} onPress={() => closeOverlay()} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Body>
                        </CardItem>                   
                </View>
                }
                {confirmation &&
                    <View style={styles.content}>
                        <CardItem>
                        <Text>This will create a new room: </Text>
                        </CardItem>
                        <CardItem>
                            
                            <Text> Name: {formState.inputValues.roomName}</Text>
                        </CardItem>
                        <CardItem style={styles.buttonCard}>
                            <Body>
                            <View style={styles.controls}>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity onPress={() => console.log("Confirm")}>
                                        <Button title="Confirm" color={Colours.right} onPress={() => submitForm()} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity onPress={() => props.visHandler(false)}>
                                        <Button title="Cancel" color={Colours.left} onPress={() => confirmationDialog()} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            </Body>
                        </CardItem>
                    </View>
                }
                
            </Card>
        </Overlay>

  
    )
}


const styles = StyleSheet.create({
    content: {
        height: 270, 
        justifyContent: 'space-between'
    },
    buttonContainer: {
        minWidth: 250,
        marginTop: 10
    },
    controls: {
        justifyContent: 'center'

    },
    buttonCard: {
        alignSelf: 'flex-end'
    }
});

export default AddRoomPopup;