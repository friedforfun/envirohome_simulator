import React, { useState } from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';

import Colours, { hex2rgba } from '../../constants/Colours';

const Utilisation = props => {

    const pickColour = () => {
        const colour = hex2rgba(Colours.efficiency_min);
        return colour;
    }

    return (
        <View>
            <Text style={styles.textColour}>Energy Utility: {props.usage*100}%</Text>
            <ProgressBar 
                progress={props.usage} 
                color={pickColour()}
                height={15} 
            />
        </View>
    );

}

const styles = StyleSheet.create({
    textColour: {
        color: Platform.OS === 'android' ? 'white' : Colours.center
    }
});


export default Utilisation;