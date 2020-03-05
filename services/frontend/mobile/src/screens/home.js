import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity
} from 'react-native';





export default class Home extends Component{
    render(){
        return(
            <View style={styles.Container}>
                
                <TouchableOpacity style={styles.LoginButton}
                 onPress ={()=>this.props.navigation.navigate("Livingroom")}>
                    <Text style={styles.text}>Living Room</Text>
                </TouchableOpacity >
                <TouchableOpacity style={styles.LoginButton}>
                    <Text style={styles.text}>bed room</Text>
                </TouchableOpacity >
                <TouchableOpacity style={styles.LoginButton}
                onPress ={()=>this.props.navigation.navigate("Kitchen")}>
                     <Text style={styles.text}>Kitchen</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.LoginButton}>
                    <Text style={styles.text}>Bathroom</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.LoginButton}>
                    <Text style={styles.text}>corridor</Text>
                </TouchableOpacity>
             
            </View>

        );
    }

}

const styles= StyleSheet.create({
    Container: {
        backgroundColor: '#2896d3',
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical:20,
        marginTop:0,
     },

     text:{
         fontSize:20,
         fontWeight:'500',
         color:"#ffffff",
     },
    
     LoginButton:{

        borderRadius:25,
        width:300,
        backgroundColor:'rgba(0,0,0,0.2)',
        height:50,
        alignItems:'center',
        paddingVertical:20,
        marginVertical: 0,
        marginTop:"8%",

     }

  

});
