import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image
} from 'react-native';


import Logo from '../components/logo';


export default class Signup extends Component{
    render(){
        return(
            < KeyboardAvoidingView behaviour='padding' styles={styles.wrapper}>
            
            <View style={styles.Container}>
                
               <Image
                 source={require('../images/logo.png')}
                 style={styles.image}/>
                 <Text style={styles.logotext}>Enviro-Homes</Text>

                <TextInput 
                   style={styles.inputbox} 
                   underlineColorAndroid='rgba(0,0,0,0)' 
                   placeholder='User-ID'/>

                <TextInput 
                   style={styles.inputbox} 
                   underlineColorAndroid='rgba(0,0,0,0)' 
                   placeholder='Password'
                   secureTextEntry={true}/>

                 <TouchableOpacity 
                 onPress ={() =>this.props.navigation.navigate("Login")} 
                 style={styles.btn}
                 >
                     <Text  style={styles.Btntext} >Signup</Text>
                 </TouchableOpacity> 

                <Text style={styles.secondtext}>Already have an Account?
                </Text>
                <TouchableOpacity 
                onPress={() =>this.props.navigation.navigate("Login")}>
                <Text style={styles.text}>Sign-In</Text>
                </TouchableOpacity>  

            </View>
        
        </KeyboardAvoidingView>

        );
    }

}

const styles= StyleSheet.create({
    wrapper:{

        flex:0,
    },
    
    Container:{
        flex:0,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#2896d3',
        paddingLeft:40,
        paddingRight:40,
       
       
    },
    
    inputbox:{
        width:300,
        height:50,
        backgroundColor:'rgba(255,255,255,0.6)',
        borderRadius:50,
        paddingHorizontal:25,
        paddingVertical:15,
        marginVertical:15,
        color:'#ffffff',
        marginBottom:20,
    },
    
    btn:{
        width:300,
        height:50,
        borderRadius:50,
        backgroundColor:'#01c853',
        padding:20,
        alignItems:'center',
        marginTop:15,
        marginBottom:20,
    },
    
 

    secondtext:{
        fontSize:20,
    },
    
    text:{
        fontSize:20,
    fontWeight:'500',
    color:"#ffffff",
    marginBottom:103.5,
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
    marginTop:"9%"
}

});
