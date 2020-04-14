import React from 'react';
import { View, Platform } from 'react-native';
import { Icon } from 'react-native-elements';

import Colours from '../../constants/Colours';

const HomeIcon = props => {
    return (
        <View style={{ flex: 1 }}>
            <Icon
                //# source: https://github.com/primer/octicons#libraries
                name="home"
                type="octicon"
                color={Platform.OS === 'android' ? 'white' : Colours.center}
                onPress={props.action}
                iconStyle={{ height: '100%' }}
            />
        </View>
    );

}


export default HomeIcon;