import React from 'react';
import { View } from 'react-native';
import { ThemeProvider, ListItem } from 'react-native-elements';

const DeviceMenu = props => {
    // Create a list of devices using list.map. see: `https://react-native-elements.github.io/react-native-elements/docs/listitem.html`
    return (
        <View>
            {
                props.devices.map((item, i) => (
                    <ListItem
                        key={i}
                        title={item.title}
                        switch={{
                            value: item.power,
                            onValueChange: console.log("switched "+item.title),
                        }}
                        bottomDivider
                        chevron

                    />
                ))
            }
        </View>
    )
}

export default DeviceMenu;