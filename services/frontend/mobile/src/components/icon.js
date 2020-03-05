import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';



export default class Icon extends Component {
    render(){
        return(
            
            <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5}>
 
                      <Image 
                        source={require('../images/icons/light-off.png')} 
                        style={styles.ImageIconStyle} 
                        />

                      

                       </TouchableOpacity>

        );
    }

}

const styles= StyleSheet.create({
    FacebookStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        //backgroundColor: '#43A047',
        borderWidth: .5,
        borderColor: '#fff',
        height: 40,
        borderRadius: 5 ,
        margin: 5,
       
      },
       
      ImageIconStyle: {
         padding: 10,
         margin: 5,
         height: 25,
         width: 25,
         resizeMode : 'stretch',
       
      },

});