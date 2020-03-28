import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from "@react-navigation/native";

import { RoomNavigator, LoginNavigator } from './AppNavigator';


const Navigator = props =>{
    // use selector from store to load authenticated or unauthenticated state
    // const isAuth = useSelector(state => !!state.auth.token);
    // const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);
    const isAuth = false;
    const didTryAutoLogin = true;

    //! need to add loading screen for when didTryAutoLogin is false
    // {!isAuth && !didTryAutoLogin && <StartupScreen />}
    return (
        <NavigationContainer>
            {isAuth && <RoomNavigator />}
            {!isAuth && didTryAutoLogin && <LoginNavigator />}
        </NavigationContainer>
    );
};

export default Navigator;