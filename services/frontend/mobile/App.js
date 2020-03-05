import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';






import Login from './src/screens/login';
import Signup from './src/screens/signup';
import Home from './src/screens/home';
import Livingroom from './src/screens/livingroom';
import Kitchen from './src/screens/kitchen';


export default class App extends Component{

  render() {
    return ( 
      <View>
       <AppContainer />
      </View>
    );
  }
}

const navigator = createStackNavigator(
    {
      Login: Login,
      Signup:Signup,
      Home:Home,
      Livingroom:Livingroom, 
      Kitchen:Kitchen
    },
    {
      initialRouteName: 'Login',
      navigationOptions: {
          header:null,
        //title: 'App'
      }
    }
  );


  const AppContainer = createAppContainer(navigator);
