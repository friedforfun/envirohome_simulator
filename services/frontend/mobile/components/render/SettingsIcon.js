import React, { useState } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

const SettingsIcon = props => {
    return (
        <View>
            <Icon
                //# source: https://github.com/primer/octicons#libraries
                name="gear"
                type="octicon"
                onPress={props.settings}
                size={50}
            />
        </View>
    );

}

export default SettingsIcon;