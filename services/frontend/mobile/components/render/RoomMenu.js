import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { ThemeProvider, ListItem } from 'react-native-elements';
import { useSelector } from 'react-redux';

const RoomMenu = props => {

  /*
        props:
            rooms -> list of rooms
            navigation -> navigation stack from RoomNavigator.js
    */

  const devices = useSelector(state => state.deviceStore.devices);
  console.log("from store:")
  
  
  const roomNameList = [...new Set(devices.map(item => item.room))];
  
 
  const roomList = roomNameList.map(room => {
    const roomDevices = devices.filter(device => device.room === room);
    const device_num = roomDevices.length;
    const power = roomDevices.reduce((sum, next) => sum + next.rated_power, 0)
    return { "name": room, "power": power, "device_num": device_num, "deviceArray": roomDevices }
  })
  console.log(roomList)
  //const roomList = [{ "name": "test", "power": 100, "device_num": 5, "deviceArray": []}]

  const selectRoomHandler = (item) => {
    console.log('Nav to ' + item.name)
    props.navigation.navigate('DevicesInRoom', {
      roomName: item.name,
      roomPower: item.power
    });
  };
 
  return (
        <View>
            {!!roomList &&
            roomList.map((item, i) => (
                <ListItem
                key={i}
                title={item.name}
                subtitle={item.power}
                badge={{ value: item.device_num, textStyle: { color: 'white' }, containerStyle: { marginTop: -20 } }}
                bottomDivider
                chevron
                onPress={() => selectRoomHandler(item)}
                />
            ))
            }
        </View>
    );
  }

  export default RoomMenu;