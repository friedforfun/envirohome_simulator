import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
 Image
} from 'react-native';

export default class Logo extends Component {
    render(){
        return(
            <View style={styles.Container}>
                <Image
                 source={require('../images/logo.png')}
                 style={styles.image}/>
                 <Text style={styles.logotext}>Enviro-Homes</Text>
            </View>

        );
    }

}

const styles = StyleSheet.create({
    Container: {
     
        flex:0,
        // justifyContent:'center',
        alignItems:'center',
        // paddingVertical:"2%",
        backgroundColor:'#2896d3',
    
     },

     logotext:{
         marginTop:0,
         marginBottom:0,
         paddingVertical:"2%",
         fontSize:30,
         color:'#ffffff',
     },
     image:{
         height:110,
         width:110,
         marginTop:"3%"
     }

});