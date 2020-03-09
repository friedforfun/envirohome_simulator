import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import NavBar from './components/NavBar';
import  ContentRenderer from './components/ContentRenderer';
import ModePicker from './components/ModePicker';

export default function App() {
  const [currentContent, nextContent] = useState('list');
  const [profileVis, setProfileVis] = useState(false);
  
  const pageToRender = page => {
    console.log('Render '+page)
    nextContent(page)
  };

  return (
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
