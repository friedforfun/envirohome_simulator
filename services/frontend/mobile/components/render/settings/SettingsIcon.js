import React from 'react';
import { View, Platform } from 'react-native';
import { Icon } from 'react-native-elements';

import Colours from '../../../constants/Colours';

const SettingsIcon = props => {
    return (
        <View style={{flex: 1}}>
                <Icon
                    //# source: https://github.com/primer/octicons#libraries
                    name="gear"
                    type="octicon"
                    color={Platform.OS === 'android' ? 'white' : Colours.center}
                    onPress={props.action}
                    size={50}
                />                     
        </View>
    );

}


export default SettingsIcon;