import React, {useState} from 'react';
import { View, ScrollView, StyleSheet, Alert, Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { Button } from 'react-native';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

import colours from '../../../constants/Colours'
import AddRoomPopup from './AddRoomPopup';
import DeleteRoom from '../../logic/DeleteRoom';
import { testResponse } from '../../logic/fetchFunc';
import Fetching from '../Fetching';
import GetAllRooms from '../../logic/GetAllRooms';
import { log } from '../../logic/PostLog';

const RoomEditor = props => {
    const userEmail = useSelector(state => state.authStore.email)
    const [overlayState, setOverlayState] = useState(false)
    const [fetchingRooms, setFetchingRooms] = useState(false)


    const confirm = (roomId) => {
        Alert.alert(
            'Are you sure?',
            'This action will delete this room and all related devices',
            [
                { text: 'CANCEL', onPress: () => { console.log("Cancel") } },
                { text: 'OK', onPress: () => deleteRoom(roomId) },
            ],
            { cancelable: false },
        );
    }

    const changeOverlayState = (bool) => {
        setOverlayState(bool)
    }
    
    const deleteRoom = (roomId) => {
        
        DeleteRoom(roomId)
            .then(Response => {
                return testResponse(Response)
            })
            .then(ok => {
                return ok.json()
            })
            .then(json => {
                console.log(json)
                if (json.success) {
                    log(userEmail, 6, "Room " + roomId + " deleted sucessfully. Response ok.", "Room " + roomId + " deleted")
                    Alert.alert(
                        'Success',
                        json.success,
                        [
                            { text: 'OK', onPress: () => refreshRooms() },
                        ],
                        { cancelable: false },
                    );
                }
            })
            .catch(error => {
                console.log(error.message)
                if (error.message === "Network request failed") {
                    log(userEmail, 6, "Room "+roomId+" was deleted with the error: Network request failed.", "Room "+roomId+" deleted")
                    Alert.alert(
                        'Network request failed',
                        'Invalid response from server, this may indicate a problem with your network. Please refresh the page.',
                        [
                            { text: 'OK', onPress: () => refreshRooms() },
                        ],
                        { cancelable: false },
                    );
                }
            })
    }

    const refreshRooms = () => {
        setFetchingRooms(true)
    }

    const fetchCompleteHandler = () => {
        setFetchingRooms(false)
    }

    return (
        <View style={styles.container}>
            {fetchingRooms && 
            <Fetching 
                fetchFunc={GetAllRooms}
                fetchWhat={"rooms"}
                ready={fetchCompleteHandler}
            />
            }
            <AddRoomPopup visible={overlayState} visHandler={changeOverlayState} refresh={refreshRooms} />
            <ScrollView style={styles.content}>
                {
                    props.roomList.map((item, i) =>{

                        return(
                            <ListItem
                                key={i}
                                title={item.room_name}
                                bottomDivider
                                rightElement={
                                    <TouchableOpacity onPress={() => confirm(item.room_id)}>
                                        <Icon
                                            name="trashcan"
                                            type="octicon"
                                            color={'red'}
                                        />
                                    </TouchableOpacity>
                                   
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
                        onPress={() => refreshRooms()}
                    />
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => changeOverlayState(true)}>
                    <Button 
                        title={"Add Room"}
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
        
    }

});
export default RoomEditor;