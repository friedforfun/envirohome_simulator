import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { RoomNavigator } from './RoomNavigator';

const Navigator = props =>{
    return (
        <NavigationContainer>
            <RoomNavigator />
        </NavigationContainer>
    );
};

export default Navigator;