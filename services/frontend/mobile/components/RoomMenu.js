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