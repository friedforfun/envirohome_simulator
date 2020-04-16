import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Container } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

import Navigator from './navigation/Navigator';
import RoomReducer from './store/reducers/room';
import AuthReducer from './store/reducers/auth';
import DeviceReducer from './store/reducers/device';
import SettingsReducer from './store/reducers/settings';

// merge reducers into single reducer (RoomReducer, AuthReducer...)
// to facilitate access to the store
const rootReducer = combineReducers({
  roomStore: RoomReducer, 
  deviceStore: DeviceReducer,
  authStore: AuthReducer,
  settingsStore: SettingsReducer
});

// actual store with thunk middleware to add data from async functions
const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  const fetchFonts = async () => {
    return await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
  };

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {setFontLoaded(true)}}
        onError={console.warn}
      />
    );
  }
  return (
    <Provider store={store}>
      <Container>
        <Navigator />
      </Container>
    </Provider>
  );
}

