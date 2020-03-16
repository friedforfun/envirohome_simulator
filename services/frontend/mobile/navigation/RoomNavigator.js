import React from 'react';
import {useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';

import { center, right, left } from '../constants/Colors';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import RoomScreen from '../screens/RoomScreen';
import DeviceScreen from '../screens/DeviceScreen';
import SettingsScreen from '../screens/Settings';
import AvatarButton from '../components/render/AvatarButton';
import SettingsIcon from '../components/render/SettingsIcon';
import Utilisation from '../components/render/Utilisation';



const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? center : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : center,
    headerTitle: () => (<Utilisation usage={'50%'}/>),
    headerLeft: () => (<AvatarButton user='A' />),
    headerRight: () => (<SettingsIcon settings={() => {}}/>)
};

const RoomListStack = createStackNavigator();

export const RoomNavigator = props => {
    
    return (
            <RoomListStack.Navigator screenOptions={defaultNavOptions}>
                <RoomListStack.Screen name="ListRooms" component={RoomScreen} />
                <RoomListStack.Screen name="DevicesInRoom" component={DeviceScreen} />
            </RoomListStack.Navigator>
    );
};

//<ScreenStack.Screen name="Login" component={LoginScreen} />
//<ScreenStack.Screen name="Register" component={RegisterScreen} />
//<ScreenStack.Screen name="Map" component={MapScreen} />
//<ScreenStack.Screen name="Settings" component={SettingsScreen} />
