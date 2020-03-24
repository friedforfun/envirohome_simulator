import React, { useState } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import RoomReducer from './store/reducers/room';
import Navigator from './navigation/Navigator';


//import DeviceReducer from './store/reducers/device'
//import { populateDevice } from './store/actions/devices';
//import { addRoom } from './store/actions/rooms';

//import AllDevices from './components/logic/CallAllDevices';

//! TODO finish these functions
/*
const uniqueRooms = apiState => {
  if (apiState.isLoading === false) {
    return [...new Set(apiState.dataSource.map(item => item.room))]
  }
};

const getDevices = apiState => {
  if (apiState.isLoading === false){
    return [...apiState.dataSource]
  }
}

*/
// const dispatch = useDispatch();

//! dispatch add room action on this array of rooms
/*
const collectRooms = uniqueRooms(AllDevices).map(room => useDispatch(addRoom(room)));

const populateDevices = getDevices(AllDevices).map(device =>
  useDispatch(populateDevice(device.device_id, device.device_name, device.device_type, device.fault, device.on, device.rated_power, device.room))
  );
*/
// const deviceList = useSelector(state => state.deviceStore)

//const fillRooms = 0;


// merge reducers into single reducer (RoomReducer, UserReducer...)
// allows us to access the 'rooms' state
const rootReducer = combineReducers({
  roomStore: RoomReducer
});

// actual store
const store = createStore(rootReducer);

  // dispatch actions to populate store here using rootReducer and CallAllDevices

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

