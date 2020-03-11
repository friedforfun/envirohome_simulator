import React from 'react';
import { View } from 'react-native';
import { ThemeProvider, ListItem } from 'react-native-elements';



const RoomMenu = props => {
  /*
        props:
            rooms -> list of rooms
    */
  // Create a list of devices using list.map. see: `https://react-native-elements.github.io/react-native-elements/docs/listitem.html`
  //! TODO: access rooms from redux room store 
  return (
        <View>
            {
            props.rooms.map((item, i) => (
                <ListItem
                key={i}
                title={item.name}
                badge={{ value: 3, textStyle: { color: 'white' }, containerStyle: { marginTop: -20 } }}
                bottomDivider
                chevron
                onPress={() => console.log("Open "+item.name+" Devices")}
                />
            ))
            }
        </View>
    );
  }

  export default RoomMenu;