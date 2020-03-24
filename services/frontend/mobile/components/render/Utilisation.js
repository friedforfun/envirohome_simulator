import React, { useState } from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import Colours from '../../constants/Colours';

const Utilisation = props => {
    return (
        <View>
            <Text style={styles.textColour}>Energy Utility:</Text>
            <Text style={styles.textColour}>{props.usage}</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    textColour: {
        color: Platform.OS === 'android' ? 'white' : Colours.center
    }
});


export default Utilisation;