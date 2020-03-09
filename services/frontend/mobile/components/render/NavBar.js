import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ThemeProvider, Avatar, Icon } from 'react-native-elements';
import UserProfile from './UserProfile';


const NavBar = props => {
    /*
        props:
            usage -> (text) percentage of grid utilisation
            settings -> calls render settings overlay function
    */

    const [profileVis, setProfileVis] = useState(false);

    const viewProfile = toggle => {
        setProfileVis(toggle);
    };

    //# see: https://react-native-elements.github.io/react-native-elements/docs/avatar.html
    return (
        <View>
            <View style={styles.content}>
                <Avatar
                    size="medium"
                    rounded
                    title="A"
                    onPress={() => viewProfile(true)}
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
            <UserProfile visible={ profileVis } handler={ viewProfile }/>
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