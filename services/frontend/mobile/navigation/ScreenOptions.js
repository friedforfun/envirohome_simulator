import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import AvatarButton from '../components/render/AvatarButton';
import SettingsIcon from '../components/render/SettingsIcon';

export const roomOptions = nav => {
    return {
        headerTitle: 'Room Select',
        headerLeft: () => (
            <AvatarButton user='A'/>
        ),
        headerRight: () => (
            <SettingsIcon />
        )
    };
};
