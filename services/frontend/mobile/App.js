import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  RoomMenu from './components/RoomMenu';
import NavBar from './components/NavBar';
import ModePicker from './components/ModePicker';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.topNav}>
        <NavBar />
      </View>
      <View style={styles.content}>
        <RoomMenu />
      </View>
      <View style={styles.modePicker}>
        <ModePicker />
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
  content:{
    flex: 20
  },
  modePicker:{
    padding: 4,
    borderColor: 'black',
    borderWidth: 1,
  }
});
