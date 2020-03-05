import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

const API = 'http://192.168.86.26:5000/';


export default class Plug extends Component {
    render(){
        return(
          <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5}>
            {this.render_light()}
          </TouchableOpacity>
        );
    }

    toggle_power(device_id){
    fetch(API+"api/device/power/"+device_id).then((response) => response.json()).then(console.log(responsejson));
    }

    render_light(){
      return this.props.on ? <Image source={require('../images/icons/plug-on.png')} style={styles.ImageIconStyle} /> : <Image source={require('../images/icons/plug-off.png')} style={styles.ImageIconStyle} />
    }
}

const styles= StyleSheet.create({
    FacebookStyle: {
        
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
         height: 'auto',
         width: '25%',
         resizeMode : 'cover',
       
      },

});
