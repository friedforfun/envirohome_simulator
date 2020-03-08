import React from 'react';
import { View } from 'react-native';
import { ThemeProvider, ListItem } from 'react-native-elements';

const list = [{
    title: 'Living Room',
  },
  {
    title: 'Kitchen',
  },
  {
    title: 'Bedroom',
  },
  {
    title: 'Bathroom',
  }
]

export default function RoomMenu() {

  // Create a list of devices using list.map. see: `https://react-native-elements.github.io/react-native-elements/docs/listitem.html`
    return (
        <View>
            {
            list.map((item, i) => (
                <ListItem
                key={i}
                title={item.title}
                badge={{ value: 3, textStyle: { color: 'white' }, containerStyle: { marginTop: -20 } }}
                bottomDivider
                chevron
                onPress={() => console.log("Open "+item.title+" Devices")}
                />
            ))
            }
        </View>
    );
  }