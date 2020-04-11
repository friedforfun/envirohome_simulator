import React, { useState } from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useSelector } from 'react-redux';

const RoomMenu = props => {
  /*
        props:
            navigation -> navigation stack from RoomNavigator.js
    */

  const rooms = useSelector(state => state.roomStore.rooms);

  const selectRoomHandler = (item) => {
    props.navigation.navigate('DevicesInRoom', {
      roomId: item.room_id,
      roomName: item.room_name,
      roomCurrentPower: item.current_power
    });
  };
 
  return (
        <View>
            {!!rooms &&
            rooms.map((item, i) => (
                <ListItem
                key={i}
                title={item.room_name}
                subtitle={item.current_power}
                badge={{ value: item.device_count, textStyle: { color: 'white' }, containerStyle: { marginTop: -20 } }}
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