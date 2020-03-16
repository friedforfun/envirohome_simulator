import React, { useState } from 'react';
import { View, Text } from 'react-native';

const Utilisation = props => {
    return (
        <View>
            <Text>Energy Utility:</Text>
            <Text>{props.usage}</Text>
        </View>
    );

}

export default Utilisation;