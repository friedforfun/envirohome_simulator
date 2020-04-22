import React, { useState, memo } from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useFocusEffect } from '@react-navigation/native';

import { deviceArrProp, roomArrProp } from '../../constants/propTypes'
import { showDevice } from '../../store/actions/devices';
import { updateMaxRatedPower } from '../../store/actions/settings';
import { clearData } from '../../store/actions/charts';
import { validDataTypes } from '../../store/reducers/charts';
import { hideDevice } from '../../store/actions/devices';

const RoomMenu = memo(props => {
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
  const revealDevice = (deviceId) => {
    dispatch(showDevice(deviceId))
  }

  const selectRoomHandler = (item) => {
    const visibleDevices = deviceArray.filter(device => device.room_id === item.room_id);
    visibleDevices.map(device => revealDevice(device.device_id));
    dispatch(clearData(validDataTypes.FROM_NOW));
    props.navigation.navigate('DevicesInRoom', {
      roomId: item.room_id,
      roomName: item.room_name,
      roomCurrentPower: item.current_power
    });
  };

  const hideDevices = () => {
    deviceArray.map(device => dispatch(hideDevice(device.device_id)))
  };

  useFocusEffect(() => {
    hideDevices()
  })
 
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
  });

  RoomMenu.propTypes = {
    deviceArray: deviceArrProp.deviceArr,
    roomArray: roomArrProp.roomArr,
    navigation: PropTypes.object.isRequired
  }

  export default RoomMenu;