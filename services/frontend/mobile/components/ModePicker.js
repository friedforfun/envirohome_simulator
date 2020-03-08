import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemeProvider, Divider, Icon } from 'react-native-elements';


const ModePicker = props => {
    return (
        <View style={styles.content}>
             <Icon 
                //# source: https://github.com/primer/octicons#libraries
                name="home"
                type="octicon"
                onPress={ props.mapView }
                size={ 50 }
            />
            <Divider style={{ backgroundColor: 'blue' }}/>
            <Icon 
                //# source: https://github.com/primer/octicons#libraries
                name="three-bars"
                type="octicon"
                onPress={ props.listView }
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

export default ModePicker;