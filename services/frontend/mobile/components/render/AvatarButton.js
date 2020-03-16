import React, { useState } from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-elements';
import UserProfile from './UserProfile';

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
            />
            <UserProfile visible={profileVis} handler={viewProfile} />
        </View>   
    );
    
}

export default AvatarButton;