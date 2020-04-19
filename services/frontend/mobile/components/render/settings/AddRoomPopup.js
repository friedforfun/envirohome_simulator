import React, { useState } from 'react';
import { Overlay } from 'react-native-elements';
import { View, Button, StyleSheet, Modal } from 'react-native';
import { Card, CardItem, Body, Text } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

import FormInput from '../FormInput';
import Colours from '../../../constants/Colours';

const AddRoomPopup = props => {
    const [confirmation, setConfirmation] = useState(false)


    return(
        <Overlay
            animationType="fade"
            borderRadius={0}
            height={250}
            isVisible={props.visible}
            onBackdropPress={() => props.visHandler(false)}
            overlayBackgroundColor="rgba(0, 0, 0, 0.5)"
        >
            <Card style={{flex:0}}>
               {!confirmation && 
               <CardItem>
                    <Body>
                        <Text>Create a new room</Text>
                        <FormInput 
                            id="roomName"
                            label="Room name"
                            required
                            errorText="Please supply a room name"
                            autoCapitalize="none"
                            returnKeyType="done"
                            keyboardType="default"
                            initialValue=""
                            onInputChange={() => {}}
                            onEndEditing={() => {}}
                            onSubmitEditing={() => console.log("Submit form")}
                        />
                    </Body>
                </CardItem>
                }
                {confirmation &&
                    <CardItem>
                        <Body>
                            <Text>This will create a new room</Text>
                            <Text>called xxx</Text>
                            <Text></Text>
                        </Body>
                    </CardItem>
                }
                <CardItem>
                    <Body>
                        <View style={styles.controls}>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={() => console.log("Confirm")}>
                                    <Button title="Confirm" color={Colours.right} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={() => props.visHandler(false)}>
                                    <Button title="Cancel" color={Colours.left} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Body>
                </CardItem>
            </Card>
        </Overlay>

  
    )
}


const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    buttonContainer: {
        minWidth: 250,
        marginTop: 10
    },
    controls: {
        justifyContent: 'center'

    }
});

export default AddRoomPopup;