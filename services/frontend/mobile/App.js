import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import RoomReducer from './store/reducers/room';
import AuthReducer from './store/reducers/auth';
import Navigator from './navigation/Navigator';

// merge reducers into single reducer (RoomReducer, AuthReducer...)
// to facilitate access to the store
const rootReducer = combineReducers({RoomReducer, AuthReducer});

// actual store with thunk middleware to add data from async functions
const store = createStore(rootReducer, applyMiddleware(thunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

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
      <Navigator />
    </Provider>
  );
}

