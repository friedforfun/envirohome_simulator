import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,

} from 'react-native';

import { Dimensions } from 'react-native';

import Icon from '../components/icon';
import Webapi from '../components/webapi';

export default class kitchen extends Component{
    render(){
            return (
                <View style={styles.container}>
                    <ImageBackground source={require('../images/kitchen.png')} style= { styles.backgroundImage }>
                        <Webapi myRoom={"kitchen"}/>
                    </ImageBackground>
                </View>
            );   
    }
}

const win = Dimensions.get('window');

const ratio = win.width/466;

const styles= StyleSheet.create({
    
    
    backgroundImage: {

      width: win.width,
      height: 300* ratio,
      opacity:10,
      
     // background: linear-gradient('#e66465', '#9198e5'),
  
      //height: win.height - (win.height*0.1)

    },
    container:{
        flex:1,
       
    },

    borderhai:{
    
        width: 300*2,
  height: 350,
  
  borderBottomLeftRadius:30,
  borderBottomRightRadius: 30,
  borderTopRightRadius: 30,
  borderTopLeftRadius: 30,

  backgroundColor:"#E0E0E0",
  alignItems:"center",
  justifyContent:"center",

  marginLeft:'30%',
  marginTop:'12%',
  

  
    },
     
    TextStyle :{
     
      color: "#fff",
      marginBottom : 4,
      marginRight :20,
      
    },
     
    SeparatorLine :{
     
    backgroundColor : '#fff',
    width: 1,
    height: 40
     
    }
    

});
