import React, { useState } from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-elements';
import UserProfile from './UserProfile';
import Colours from '../../constants/Colours'

const AvatarButton = props => {
    const [profileVis, setProfileVis] = useState(false);

    const viewProfile = toggle => {
        setProfileVis(toggle);
    };

    return (
        <View>
            <Avatar
                size="medium"
                rounded
                title={props.user}
                onPress={() => viewProfile(true)}
                iconStyle= {{color: Colours.left}}
                activeOpacity={0.7}
            />
            <UserProfile visible={profileVis} handler={viewProfile} />
        </View>   
    );
    
}

export default AvatarButton;