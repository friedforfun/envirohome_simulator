import React from 'react';
import { View } from 'react-native';
import { ThemeProvider, ListItem } from 'react-native-elements';



const RoomMenu = props => {
  /*
        props:
            rooms -> list of rooms
    */
  // Create a list of devices using list.map. see: `https://react-native-elements.github.io/react-native-elements/docs/listitem.html`
    return (
        <View>
            {
            props.rooms.map((item, i) => (
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

  export default RoomMenu;