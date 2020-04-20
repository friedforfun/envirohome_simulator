import React, { useState, useReducer, useCallback } from 'react';
import { Overlay } from 'react-native-elements';
import { View, Button, StyleSheet } from 'react-native';
import { Card, CardItem, Body, Text, Footer } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

import FormInput from '../FormInput';
import Colours from '../../../constants/Colours';

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

    const confirmationDialog = () => {
        setConfirmation(confirmation ? false : true)
    }

    const closeOverlay = () => {
        props.visHandler(false)
        setConfirmation(false)
    }

    const submitForm = () => {

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
                                <FormInput 
                                    id="roomName"
                                    label="Room name"
                                    required
                                    errorText="Please supply a room name, at least 3 characters"
                                    autoCapitalize="none"
                                    returnKeyType="done"
                                    keyboardType="default"
                                    initialValue=""
                                    minLength={3}
                                    onInputChange={inputChangeHandler}
                                    onEndEditing={() => {}}
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
                        <Text>This will create a new room </Text>
                        </CardItem>
                        <CardItem>
                            
                            <Text> called {formState.roomName}</Text>
                        </CardItem>
                        <CardItem style={styles.buttonCard}>
                            <Body>
                            <View style={styles.controls}>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity onPress={() => console.log("Confirm")}>
                                        <Button title="Confirm" color={Colours.right} onPress={() => console.log("Confirm")} />
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