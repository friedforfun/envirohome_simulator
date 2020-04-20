import React, {useState} from 'react';
import { View, ScrollView, StyleSheet, Alert, Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { Button } from 'react-native';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

import colours from '../../../constants/Colours'
import AddRoomPopup from './AddRoomPopup';

const RoomEditor = props => {
    const rooms = useSelector(state => state.roomStore.rooms)
    const [overlayState, setOverlayState] = useState(false)


    const confirm = () => {
        Alert.alert(
            'Are you sure?',
            'This action will delete this room and all related devices',
            [
                { text: 'CANCEL', onPress: () => { console.log("Cancel") } },
                { text: 'OK', onPress: () => { console.log("Confirm") } },
            ],
            { cancelable: false },
        );
    }

    const changeOverlayState = (bool) => {
        setOverlayState(bool)
    }
    


    return (
        <View style={styles.container}>
            <AddRoomPopup visible={overlayState} visHandler={changeOverlayState} />
            <ScrollView style={styles.content}>
                {
                    rooms.map((item, i) =>{

                        return(
                            <ListItem
                                key={i}
                                title={item.room_name}
                                bottomDivider
                                rightElement={
                                    <TouchableOpacity onPress={() => confirm()}>
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
                        onPress={() => console.log("Fetch rooms")}
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