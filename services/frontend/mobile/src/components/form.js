import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';



export default class Form extends Component {
    render(){
        return(
            <View style={styles.Container}>
            <TextInput 
            style={styles.inputbox} 
            underlineColorAndroid='rgba(0,0,0,0)' 
            placeholder='User-ID'/>

            <TextInput 
            style={styles.inputbox} 
            underlineColorAndroid='rgba(0,0,0,0)' 
            placeholder='Password'
            secureTextEntry={true}/>

          
            </View>

        );
    }

}

const styles= StyleSheet.create({
    Container: {
        
        flex :1,
        alignItems: 'center',
        justifyContent: 'flex-end',
     },

     inputbox:{
         width:300,
         height:50,
         backgroundColor:'rgba(255,255,255,0.6)',
         borderRadius:50,
         paddingHorizontal:25,
         paddingVertical:15,
         marginVertical:15,
         color:'#ffffff'
     },
   

});