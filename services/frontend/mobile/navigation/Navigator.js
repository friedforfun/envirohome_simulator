import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from "@react-navigation/native";

import { RoomNavigator, LoginNavigator, SettingsNavigator } from './AppNavigator';
 

const Navigator = props =>{
    // use selector from store to load authenticated or unauthenticated state
    const isAuth = useSelector(state => !!state.authStore.authToken);
    // const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);
    const didTryAutoLogin = true;
    const settingsOpen = useSelector(state => !!state.settingsStore.settingsOpen);

    //! need to add loading screen for when didTryAutoLogin is false
    // {!isAuth && !didTryAutoLogin && <StartupScreen />}
    return (
        <NavigationContainer>
            {isAuth && settingsOpen && <SettingsNavigator />}
            {isAuth && !settingsOpen && <RoomNavigator />}
            {!isAuth && didTryAutoLogin && <LoginNavigator />}
        </NavigationContainer>
    );
};
 
export default Navigator;