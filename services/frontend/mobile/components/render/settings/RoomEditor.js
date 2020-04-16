import React from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { Button } from 'react-native';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

import colours from '../../../constants/Colours'

const RoomEditor = props => {
    const rooms = useSelector(state => state.roomStore.rooms)


    const confirm = () => {
        Alert.alert(
            'Are you sure?',
            'This action will delete this room and all related devices',
            [
                { text: 'OK', onPress: () => {console.log("Confirm") } },
                { text: 'CANCEL', onPress: () => { console.log("Cancel") } },
            ],
            { cancelable: false },
        );
    }
    


    return (
        <View style={styles.container}>
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
                
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => console.log("Add room")}>
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