import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert, Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { Button } from 'react-native';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

import colours from '../../../constants/Colours'
import AddDevicePopup from './AddDevicePopup';
import DeleteDevice from '../../logic/DeleteDevice';
import { testResponse } from '../../logic/fetchFunc';
import Fetching from '../Fetching';
import GetAllDevices from '../../logic/GetAllDevices';
import { log } from '../../logic/PostLog';

const DeviceEditor = props => {
    const userEmail = useSelector(state => state.authStore.email)
    const [overlayState, setOverlayState] = useState(false)
    const [fetchingDevices, setFetchingDevices] = useState(false)

    console.log(props.deviceList)

    const confirm = (deviceId) => {
        Alert.alert(
            'Are you sure?',
            'This action will delete this device, this cannot be undone.',
            [
                { text: 'CANCEL', onPress: () => { console.log("Cancel") } },
                { text: 'OK', onPress: () => deleteRoom(deviceId) },
            ],
            { cancelable: false },
        );
    }

    const changeOverlayState = (bool) => {
        setOverlayState(bool)
    }

    const deleteDevice = (deviceId) => {

        DeleteDevice(deviceId)
            .then(Response => {
                return testResponse(Response)
            })
            .then(ok => {
                return ok.json()
            })
            .then(json => {
                console.log(json)
                if (json.success) {
                    log(userEmail, 8, "Device " + deviceId + " deleted sucessfully. Response ok.", "Device " + deviceId + " deleted")
                    Alert.alert(
                        'Success',
                        json.success,
                        [
                            { text: 'OK', onPress: () => refreshDevice() },
                        ],
                        { cancelable: false },
                    );
                }
            })
            .catch(error => {
                console.log(error.message)
                if (error.message === "Network request failed") {
                    log(userEmail, 8, "Device " + deviceId + " was deleted with the error: Network request failed.", "Device " + deviceId + " deleted")
                    Alert.alert(
                        'Network request failed',
                        'Invalid response from server, this may indicate a problem with your network. Please refresh the page.',
                        [
                            { text: 'OK', onPress: () => refreshDevice() },
                        ],
                        { cancelable: false },
                    );
                }
            })
    }

    const refreshDevice = () => {
        setFetchingDevices(true)
    }

    const fetchCompleteHandler = () => {
        setFetchingDevices(false)
    }
    console.log(props.deviceList)
    return (
        <View style={styles.container}>
            {fetchingDevices &&
                <Fetching
                    fetchFunc={GetAllDevices}
                    fetchWhat={"devices"}
                    ready={fetchCompleteHandler}
                />
            }
            <AddDevicePopup visible={overlayState} visHandler={changeOverlayState} refresh={refreshDevice} roomId={props.roomId}/>
            <ScrollView style={styles.content}>
                {
                    props.deviceList.map((item, i) => {
                        
                        return (
                            <ListItem
                                key={i+1}
                                title={item.device_name}
                                bottomDivider
                                rightElement={
                                    <View style={styles.horizontalView}>
                                        <TouchableOpacity onPress={() => confirm(item.device_id)}>
                                            <Icon
                                                name="trashcan"
                                                type="octicon"
                                                color={'red'}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                }
                            />
                        )
                    })
                }
                <View>
                    <Icon
                        name='sync'
                        type='octicon'
                        size={100}
                        color="grey"
                        onPress={() => refreshDevice()}
                    />
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => changeOverlayState(true)}>
                    <Button
                        title={"Add Device"}
                        color={colours.left}

                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
    },
    content: {
        flex: 10,
    },
    buttonContainer: {

    },
    horizontalView: {
        flexDirection: 'row'
    },
    plusIcon: {
        marginRight: 50,
        flexDirection: 'row'
    },
    inspectDevices: {
        marginRight: 10
    }


});
export default DeviceEditor;