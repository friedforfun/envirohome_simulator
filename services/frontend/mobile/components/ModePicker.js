import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { ThemeProvider, Divider, Icon } from 'react-native-elements';


export default function ModePicker() {
    return (
        <View style={styles.content}>
             <Icon 
                //# source: https://github.com/primer/octicons#libraries
                name="home"
                type="octicon"
                onPress={() => console.log("Open Map view")}
                size={ 50 }
            />
            <Divider style={{ backgroundColor: 'blue' }}/>
            <Icon 
                //# source: https://github.com/primer/octicons#libraries
                name="three-bars"
                type="octicon"
                onPress={() => console.log("Open List view")}
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
  });