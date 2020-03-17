import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';

import { center, right, left } from '../constants/Colours';
import RoomScreen from '../screens/RoomScreen';
import DeviceScreen from '../screens/DeviceScreen';
import AvatarButton from '../components/render/AvatarButton';
import SettingsIcon from '../components/render/SettingsIcon';
import Utilisation from '../components/render/Utilisation';

import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/RegisterScreen';
import SettingsScreen from '../screens/Settings';


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
    headerRight: () => (<SettingsIcon settings={() => {}}/>)
};

const RoomListStack = createStackNavigator();

export const RoomNavigator = props => {
    
    return (
            <RoomListStack.Navigator screenOptions={defaultNavOptions} initialRouteName="ListRooms">
                <RoomListStack.Screen name="ListRooms" component={RoomScreen} screenOptions={{headerLeft: () => (<AvatarButton user='A' />)}}/>
                <RoomListStack.Screen name="DevicesInRoom" component={DeviceScreen} />
            </RoomListStack.Navigator>
    );
};

const SettingsStack = createStackNavigator();
const SettingsNavigator = props => {
//<ScreenStack.Screen name="Settings" component={SettingsScreen} />
// all settings children
};

const LoginStack = createStackNavigator();
const LoginNavigator = props => {
//<ScreenStack.Screen name="Login" component={LoginScreen} />
//<ScreenStack.Screen name="Register" component={RegisterScreen} />
};

//<ScreenStack.Screen name="Map" component={MapScreen} />

