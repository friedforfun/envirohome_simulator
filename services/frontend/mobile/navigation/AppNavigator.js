import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import { Icon } from 'react-native-elements'

import Colours from '../constants/Colours';
import RoomScreen from '../screens/RoomScreen';
import DeviceScreen from '../screens/DeviceScreen';
import AvatarButton from '../components/render/AvatarButton';
import SettingsIcon from '../components/render/SettingsIcon';
import Utilisation from '../components/render/Utilisation';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SettingsRoot from '../screens/SettingsRoot';
import { TouchableOpacity } from 'react-native-gesture-handler';


const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colours.center : ''
    },
    headerTitleStyle: {
        justifyContent: 'center',
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colours.center,
    headerTitle: () => (<Utilisation usage={'50%'}/>),
    headerRight: props => (<TouchableOpacity><SettingsIcon settings={ () => console.log()}/></TouchableOpacity>)
};

const RoomListStack = createStackNavigator();

export const RoomNavigator = props => {
    
    return (
            <RoomListStack.Navigator screenOptions={defaultNavOptions} initialRouteName="ListRooms">
                <RoomListStack.Screen name="ListRooms" component={RoomScreen} options={{headerLeft: () => (<AvatarButton user='A' />)}}/>
                <RoomListStack.Screen name="DevicesInRoom" component={DeviceScreen} />
            </RoomListStack.Navigator>
    );
};

const SettingsStack = createStackNavigator();
const SettingsNavigator = props => {
    <SettingsStack.Navigator initialRouteName="SettingsRoot" >
        <SettingsStack.Screen name="SettingsRoot" component={SettingsRoot} />
    </SettingsStack.Navigator>
//
// all settings children
};

const AuthNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colours.center : ''
    },
    title: 'Authentication',
    headerTitleStyle: {
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: 'open-sans-bold',
        flex: 1
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}

const LoginStack = createStackNavigator();
export const LoginNavigator = props => {
    return (
        <LoginStack.Navigator screenOptions={AuthNavOptions} initialRouteName="RegisterScreen">
            <LoginStack.Screen name="LoginScreen" component={LoginScreen} />
            <LoginStack.Screen name="RegisterScreen" component={RegisterScreen} />
        </LoginStack.Navigator>
    );
    
};

//<ScreenStack.Screen name="Map" component={MapScreen} />

