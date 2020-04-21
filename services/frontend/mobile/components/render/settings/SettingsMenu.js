import React from 'react';
import { View, Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

// toggle settings menu based on user privileges (case switch or something)
const settings = [
    { title: 'Power management', contentID: "powerManager", development: true }, { title: 'Edit Rooms', contentID: "editRooms", development: false }, { title: 'Statistics', contentID: "stats", development: true }, { title: 'Notification Settings', contentID: "notificationSettings", development: true }
];
const adminSettings = [
    ...settings, { title: 'Manage Users', contentID: "manageUsers", development: true }, { title: 'Logs', contentID: "logs", development: false }
];

const underConstruction = (
    <View style={{flexDirection: 'row'}}>
        <Icon
            name="stop"
            type="octicon"
            size={22}
            color={'grey'}
        />
        <Text style={{ marginLeft: 5, color: 'grey' }}>Under construction</Text>
    </View>
)


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
                                    rightElement={
                                        item.development ? underConstruction : <View></View>
                                    }
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