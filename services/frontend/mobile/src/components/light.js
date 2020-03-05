import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

export default class Light extends Component {
    render(){
        return(
          <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5}>
            {this.render_light()}
          </TouchableOpacity>
        );
    }

    render_light(){
      return (this.props.on ? <Image source={require('../images/icons/light-on.png')} style={styles.ImageIconStyle} /> 
      : <Image source={require('../images/icons/light-off.png')} style={styles.ImageIconStyle} />)
    }
}

const styles= StyleSheet.create({
    FacebookStyle: {
        
        alignItems: 'center',
        justifyContent: 'centre',
        //backgroundColor: '#43A047',
        borderWidth: .5,
        borderColor: '#fff',
        height: 40,
        borderRadius: 3 ,
        margin: 2,
       
      },
       
      ImageIconStyle: {
         padding: 10,
         margin: 5,
         height: 'auto',
         width: '25%',
         resizeMode : 'cover',
       
      },

});
