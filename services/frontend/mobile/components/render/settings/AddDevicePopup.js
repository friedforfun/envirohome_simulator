import React, { useState, useReducer, useCallback } from 'react';
import { Overlay, Icon } from 'react-native-elements';
import { View, Button, StyleSheet, Alert } from 'react-native';
import { Card, CardItem, Body, Text, Picker, Form } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { Row, Grid, Col } from 'react-native-easy-grid';

import FormInput from '../FormInput';
import Colours from '../../../constants/Colours';
import AddDevice from '../../logic/AddDevice';
import { testResponse } from '../../logic/fetchFunc';
import { log } from '../../logic/PostLog';

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
        }
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
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

const AddDevicePopup = props => {

    const example = {
        "device_name": "Solar Panel B",
        "rated_power": 1000,
        "is_fault": false,
        "is_on": false,
        "room_id": 1,
        "is_generator": true
    }

    const [confirmation, setConfirmation] = useState(false)
    const [typeSelection, setTypeSelection] = useState()

    const userEmail = useSelector(state => state.authStore.email)
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            type: 'plug',
            device_name: '',
            rated_power: '',
            is_fault: false,
            is_on: false,
            room_id: props.roomId,
            is_generator: false,
        },
        inputValidities: {
            type: true,
            device_name: false,
            rated_power: false,
            is_fault: true,
            is_on: true,
            room_id: true,
            is_generator: true
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
        inputChangeHandler("device_name", '', false)
        inputChangeHandler("rated_power", '', false)
    }

    const confirmationDialog = () => {
        if (confirmation) {
            clearForm()
        }
        if (formState.formIsValid) {
            setConfirmation(confirmation ? false : true)
        } else {
            Alert.alert(
                'Invalid  form',
                'Please check the supplied values',
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
        console.log(formState.inputValues.type)
        console.log(formState.inputValues.device_name)
        console.log(formState.inputValues.rated_power) 
        console.log(props.roomId) 
        console.log(formState.inputValues.is_generator)
        AddDevice(formState.inputValues.type, formState.inputValues.device_name, formState.inputValues.rated_power, props.roomId, formState.inputValues.is_generator)
            .then(Response => {
                return testResponse(Response)
            })
            .then(ok => {
                return ok.json()
            })
            .then(json => {
                console.log(json)
                if (json.success) {
                    log(userEmail, 5, "Room sucessfully added: " + formState.inputValues.device_name + "\nResponse:" + json.success, "Room added")
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
                if (error.message === "Network request failed") {
                    log(userEmail, 5, "Room " + formState.inputValues.device_name + " was added with the error: Network request failed.", "Room added")
                    Alert.alert(
                        'Network request failed',
                        'Invalid response from server, this may indicate a problem with your network. Please refresh the page.',
                        [
                            {
                                text: 'OK', onPress: () => {
                                    closeOverlay()
                                }
                            },
                        ],
                        { cancelable: false },
                    );
                }
            })
    }

    const onTypeValueChange = (value) => {
        if (value === "solar"){
            inputChangeHandler("is_generator", true, true)
        } else {
            inputChangeHandler("is_generator", false, true)
        }
        inputChangeHandler("type", value, true)
        setTypeSelection(value)
    }

    const boxHeight = 450
    return (
        <Overlay
            animationType="fade"
            borderRadius={0}
            height={boxHeight}
            isVisible={props.visible}
            onBackdropPress={() => closeOverlay()}
            overlayBackgroundColor="rgba(0, 0, 0, 0.5)"
        >
            <Card style={{ flex: 0, height: boxHeight-30 }}>
                {!confirmation &&
                    <View style={styles.content}>
                        <CardItem style={styles.buttonCard}>
                            <Body>
                                <Text>Create a new device</Text>

                            </Body>
                        </CardItem>
                        <CardItem>
                            <Grid>
                                <Col>
                                    <Form>
                                        <FormInput
                                            id="device_name"
                                            label="Device name"
                                            required
                                            errorText="Please supply at least 3 characters"
                                            autoCapitalize="none"
                                            returnKeyType="next"
                                            keyboardType="default"
                                            initialValue=""
                                            minLength={3}
                                            onInputChange={inputChangeHandler}
                                            onEndEditing={() => { }}
                                            onSubmitEditing={() => console.log("move to rated power")}
                                        />
                               
                                        <FormInput
                                            id="rated_power"
                                            label="Rated power"
                                            required
                                            errorText="Please supply numeric digits only"
                                            returnKeyType="next"
                                            keyboardType="number-pad"
                                            numbersOnly
                                            initialValue=""
                                            minLength={1}
                                            onInputChange={inputChangeHandler}
                                            onEndEditing={() => { }}
                                            onSubmitEditing={() => console.log("Submit")}
                                        />
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.formText}>Device type:</Text>
                                            <Picker
                                                mode="dropdown"
                                                placeholder="Device Type"
                                                label="Device Type"
                                                iosIcon={<Icon name="arrow-down" />}
                                                textStyle={{ color: "#5cb85c" }}
                                                itemStyle={{
                                                    backgroundColor: "#d3d3d3",
                                                    marginLeft: 0,
                                                    paddingLeft: 10
                                                }}
                                                itemTextStyle={{ color: '#788ad2' }}
                                                style={{ width: undefined }}
                                                selectedValue={typeSelection}
                                                onValueChange={(val) => onTypeValueChange(val)}
                                            >
                                                <Picker.Item label="Plug" value="plug" />
                                                <Picker.Item label="Solar" value="solar" />
                                                <Picker.Item label="TV" value="tv" />
                                                <Picker.Item label="Thermostat" value="thermostat" />
                                                <Picker.Item label="Lights" value="lights" />
                                            </Picker>
                                        </View>
                                    </Form>
                                </Col>
                            </Grid>
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

                            <Text> Name: {formState.inputValues.device_name}</Text>
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
    },
    formText: {
         padding: 14,
         fontWeight: 'bold',
         color: 'grey'

        }
});

export default AddDevicePopup;