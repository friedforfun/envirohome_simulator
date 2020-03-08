import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { ThemeProvider, Avatar, Icon } from 'react-native-elements';


export default function NavBar() {
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
                <Text>50%</Text>
            </View>
            <Icon 
                //# source: https://github.com/primer/octicons#libraries
                name="gear"
                type="octicon"
                onPress={() => console.log("Open Settings Menu")}
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