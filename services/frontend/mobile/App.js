import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import RoomReducer from './store/reducers/rooms';
import NavBar from './components/render/NavBar';
import  ContentRenderer from './components/render/ContentRenderer';
import ModePicker from './components/render/ModePicker';

export default function App() {
  const [currentContent, nextContent] = useState('list');

  // merge reducers into single reducer (RoomReducer, DeviceReducer...)
  // allows us to access the 'rooms' state
  const rootReducer = combineReducers({
    roomStore: RoomReducer
  });

  // actual store
  const store = createStore(rootReducer);
 
  const pageToRender = page => {
    console.log('Render '+page)
    nextContent(page)
  };

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <View style={styles.topNav}>
          <NavBar 
            usage={ <Text>50%</Text> } 
            settings={() => pageToRender('settings')} 
          />
        </View>
        <ContentRenderer page={ currentContent } />
        <View style={styles.modePicker}>
          <ModePicker 
            mapView={() => pageToRender('map')} 
            listView={() => pageToRender('roomList')}
          />
        </View>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 45,
    flex: 1,
    backgroundColor: '#fff',
  },
  topNav:{
    padding: 4,
    borderColor: 'black',
    borderWidth: 1,
  },
  modePicker:{
    padding: 4,
    borderColor: 'black',
    borderWidth: 1,
  }
});
