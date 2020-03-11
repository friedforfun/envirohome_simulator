import React from 'react';
import { StyleSheet, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import { ThemeProvider, Icon } from 'react-native-elements';


const ModePicker = props => {
    /*
        props:
            mapView -> calls function to render map view
            listView -> calls function to render list view
    */
    return (
        <View style={styles.content}>
            <TouchableHighlight style={styles.buttonAnim} >
                <Icon 
                    //# source: https://github.com/primer/octicons#libraries
                    name="home"
                    type="octicon"
                    onPress={ props.mapView }
                    
                    size={ 50 }
                />
            </TouchableHighlight>
            <TouchableHighlight style={styles.buttonAnim}>
                <Icon 
                    //# source: https://github.com/primer/octicons#libraries
                    name="three-bars"
                    type="octicon"
                    onPress={ props.listView }
                    size={ 50 }
                />
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    content:{
        flexDirection: 'row',


    },
    buttonAnim:{
        flex: 1,
        justifyContent: 'center',
      }
});

export default ModePicker;