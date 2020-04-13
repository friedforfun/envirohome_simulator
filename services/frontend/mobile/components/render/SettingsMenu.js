import React from 'react';
import { View } from 'react-native';
import { ThemeProvider, ListItem } from 'react-native-elements';

// toggle settings menu based on user privileges (case switch or something)
const settings = [
    {title: 'Power management'}, { title: 'Rooms' }, {title: 'Statistics'}, {title:'Notification Settings'}
];
const adminSettings = [
    settings, { title: 'Manage Users' }, { title: 'Logs' }
];

const menuDisplay = (priv) => {
    switch(priv){
        case 'admin':
            return(
            <View>
            {
                adminSettings.map((item, i) => (
                    <ListItem
                        key={i}
                        title={item.title}
                        bottomDivider
                        chevron
                        onPress={() => console.log("Open "+item.title+" menu")}
                    />
                ))
            }
            </View>
            )
        case 'user': 
            return(
            <View>
                {
                    settings.map((item, i) => (
                        <ListItem
                            key={i}
                            title={item.title}
                            bottomDivider
                            chevron
                            onPress={() => console.log("Open "+item.title+" menu")}
                        />
                    ))
                }
            </View>
            )
        default: menuDisplay('user')
    }
}

const SettingsMenu = () => {
    return (
        menuDisplay('user')
    )
}

export default SettingsMenu;