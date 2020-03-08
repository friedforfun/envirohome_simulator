import React from 'react';
import { View } from 'react-native';
import { ThemeProvider, ListItem } from 'react-native-elements';

const list = [
    {
      title: 'Light',
      power: true,
  },
  {
      title: 'TV',
      power: false,
  },
  {
      title: 'Speakers',
      power: false,
  },
  {
      title: 'Plug',
      power: true,
  }
]

export default function DeviceMenu() {

    return (
        <View>
            {
            list.map((item, i) => (
                <ListItem
                key={i}
                title={item.title}
                switch={{
		            value: item.power,
		            onValueChange: console.log(item.power),
		          }}
                bottomDivider
                chevron
                
                />
            ))
            }
        </View>
    );
  }