import React from 'react';
import { StyleSheet, View, Image, Text, ShadowPropTypesIOS } from 'react-native';
import { ThemeProvider, Avatar, Icon } from 'react-native-elements';


const NavBar = props => {
    //# see: https://react-native-elements.github.io/react-native-elements/docs/avatar.html
    return (
        <View style={styles.content}>
            <Avatar
                size="medium"
                rounded
                title="A"
                onPress={() => console.log("Open user profile")}
            />
            <View style={styles.energyHUD}>
                <Text>Energy Utility:</Text>
                <Text>{ props.usage }</Text>
            </View>
            <Icon 
                //# source: https://github.com/primer/octicons#libraries
                name="gear"
                type="octicon"
                onPress={ props.settings }
                size={ 50 }
            />
        </View>
    );
  }

  const styles = StyleSheet.create({
      content:{
          flexDirection: 'row',
          justifyContent: 'space-between',
      },
      energyHUD:{
        alignContent: "center"
      }
  });

export default NavBar;