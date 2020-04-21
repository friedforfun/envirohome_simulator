import React, { useState } from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { deviceArrProp, roomArrProp } from '../../constants/propTypes'

import { updateMaxRatedPower } from '../../store/actions/settings';
import { clearData } from '../../store/actions/charts';
import { validDataTypes } from '../../store/reducers/charts';

const RoomMenu = props => {
  /*
        props:
            navigation -> navigation stack from RoomNavigator.js
    */

  const [updatingPower, setUpdatingPower] = useState(true);

  const dispatch = useDispatch();

  const rooms = props.roomArray;

  const deviceArray = props.deviceArray;
  const updatePowerStore = () => {
    if (deviceArray !== []) {
      dispatch(updateMaxRatedPower(deviceArray));
    }
    setUpdatingPower(false)
  }

  const selectRoomHandler = (item) => {
    dispatch(clearData(validDataTypes.FROM_NOW))
    props.navigation.navigate('DevicesInRoom', {
      roomId: item.room_id,
      roomName: item.room_name,
      roomCurrentPower: item.current_power
    });
  };
 
  return (
        <View>
            { updatingPower && updatePowerStore() }
            {!!rooms &&
            rooms.map((item, i) => {
              const powerVal = "Rated Power: " + item.current_power
              return (
                <ListItem
                  key = { i }
                  title = { item.room_name }
                  subtitle = {powerVal}
                  badge = {{ value: item.device_count, textStyle: { color: 'white' }, containerStyle: { marginTop: -20 } }}
                  bottomDivider
                  chevron
                  onPress={() => selectRoomHandler(item)}
                />
                );
            })}
        </View>
    );
  }

  RoomMenu.propTypes = {
    deviceArray: deviceArrProp.deviceArr,
    roomArray: roomArrProp.roomArr
  }

  export default RoomMenu;