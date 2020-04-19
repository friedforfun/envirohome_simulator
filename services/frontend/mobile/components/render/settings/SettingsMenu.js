import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

// toggle settings menu based on user privileges (case switch or something)
const settings = [
    { title: 'Power management', contentID: "powerManager" }, { title: 'Edit Rooms', contentID: "editRooms" }, { title: 'Statistics', contentID: "stats" }, { title: 'Notification Settings', contentID: "notificationSettings" }
];
const adminSettings = [
    ...settings, { title: 'Manage Users', contentID: "manageUsers" }, { title: 'Logs', contentID: "logs" }
];

const SettingsMenu = props => {

    const navigator = useNavigation();

    const selectMenuHandler = (menuItem) => {
        navigator.navigate('SettingsContent', {
            content: menuItem
        });
    };

    const menuDisplay = (priv) => {
        switch (priv) {
            case 'admin':
                return (
                    <View>
                        {
                            adminSettings.map((item, i) => (
                                <ListItem
                                    key={i}
                                    title={item.title}
                                    bottomDivider
                                    chevron
                                    onPress={() => selectMenuHandler(item.contentID)}
                                />
                            ))
                        }
                    </View>
                )
            case 'user':
                return (
                    <View>
                        {
                            settings.map((item, i) => (
                                <ListItem
                                    key={i}
                                    title={item.title}
                                    bottomDivider
                                    chevron
                                    onPress={() => selectMenuHandler(item.contentID)}
                                />
                            ))
                        }
                    </View>
                )
            default: menuDisplay('user')
        }
    }

    return (
        menuDisplay('admin')
    )
}

export default SettingsMenu;