import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Image
} from 'react-native';







export default class Login extends Component{
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
                     onPress ={() =>this.props.navigation.navigate("Home")} 
                     style={styles.btn}
                     >
                         <Text style={styles.loginbtn}>Login</Text>
                     </TouchableOpacity> 

                    <Text style={styles.secondtext}>Do not have an Account?
                    </Text>
                    <TouchableOpacity 
                    onPress={() =>this.props.navigation.navigate("Signup")}>
                    <Text style={styles.text}>Sign-Up</Text>
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
    
    marginBottom:20,
},

btn:{
    width:300,
    height:50,
    borderRadius:50,
    backgroundColor:'#01c853',
    padding:20,
    alignItems:'center',
    alignContent:'center',
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
    marginBottom:90,
},

loginbtn:{
    color:'#ffffff',
    fontSize:20,
    fontWeight:'500',
    justifyContent: "center",
    padding:-1, 
   textAlignVertical: "center"
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
    marginTop:"8%"
}



  

});
