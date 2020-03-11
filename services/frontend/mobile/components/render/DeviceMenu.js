import React from 'react';
import { View } from 'react-native';
import { ThemeProvider, ListItem } from 'react-native-elements';

const DeviceMenu = props => {
    /*
        props:
            devices -> list of devices
    */
    // Create a list of devices using list.map. see: `https://react-native-elements.github.io/react-native-elements/docs/listitem.html`
    return (
        <View>
            {
                props.devices.map((item, i) => (
                    <ListItem
                        key={i}
                        title={item.name}
                        switch={{
                            value: item.power,
                            onValueChange: console.log("switched "+item.name),
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