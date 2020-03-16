import React, { useState } from 'react';
import { View } from 'react-native';
import { ThemeProvider, ListItem } from 'react-native-elements';
import CallAllDevices from '../logic/CallAllDevices';
import RegisterUser from '../logic/RegisterUser';



const RoomMenu = props => {

  /*
        props:
            rooms -> list of rooms
            navigation -> navigation stack from RoomNavigator.js
    */

  const selectRoomHandler = (item) => {
    console.log('Nav to ' + item.name)
    props.navigation.navigate('DevicesInRoom', {
      roomID: item.roomID,
      roomName: item.name,
      deviceArray: item.deviceArray
    });
  };

  return (
    
        <View>
          
            {
            props.rooms.map((item, i) => (
                <ListItem
                key={i}
                title={item.name}
                badge={{ value: 3, textStyle: { color: 'white' }, containerStyle: { marginTop: -20 } }}
                bottomDivider
                chevron
                onPress={selectRoomHandler.bind(item)}
                />
            ))
            }
        </View>
    );
  }

  export default RoomMenu;