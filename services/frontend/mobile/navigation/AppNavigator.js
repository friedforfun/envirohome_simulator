import React from 'react';
import {View} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';

import Colours from '../constants/Colours';
import AvatarButton from '../components/render/AvatarButton';
import UtilisationHeader from '../components/render/UtilisationHeader';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SettingsRoot from '../screens/SettingsRoot';
import SettingsContent from '../screens/SettingsContent';
import RoomScreen from '../screens/RoomScreen';
import DeviceScreen from '../screens/DeviceScreen';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colours.center : ''
    },
    headerTitleStyle: {
        justifyContent: 'center',
    },
    headerBackTitleStyle: {
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colours.center,
    headerTitle: () => (<UtilisationHeader />),
    
    headerRight: () => (<View></View>)
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
export const SettingsNavigator = props => {
    return (
        <SettingsStack.Navigator screenOptions={defaultNavOptions} initialRouteName="SettingsRoot" >
            <SettingsStack.Screen name="SettingsRoot" component={SettingsRoot} options={{ headerLeft: () => (<AvatarButton user='A' />) }} />
            <SettingsStack.Screen name="SettingsContent" component={SettingsContent} />
        </SettingsStack.Navigator>
    );
};

const AuthNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colours.center : ''
    },
    title: 'Authentication',
    headerTitleStyle: {
        textAlign: 'center',
        alignSelf: 'center',

        flex: 1
    },
    headerBackTitleStyle: {

    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colours.center
}

const LoginStack = createStackNavigator();
export const LoginNavigator = props => {
    return (
        <LoginStack.Navigator screenOptions={AuthNavOptions} initialRouteName="LoginScreen">
            <LoginStack.Screen name="LoginScreen" component={LoginScreen} />
            <LoginStack.Screen name="RegisterScreen" component={RegisterScreen} />
        </LoginStack.Navigator>
    );
    
};

//<ScreenStack.Screen name="Map" component={MapScreen} />

