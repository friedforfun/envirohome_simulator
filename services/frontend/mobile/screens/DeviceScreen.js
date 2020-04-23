import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Divider, ListItem } from 'react-native-elements'
import { useDispatch } from 'react-redux';


import DeviceMenuWrapper from '../components/render/reduxConnect/DeviceMenuWrapper';
import SettingsIcon from '../components/render/settings/SettingsIcon';
import { openSettings } from '../store/actions/settings';
import { hideDevice } from '../store/actions/devices'


const DeviceScreen = props => {

    const dispatch = useDispatch();
    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => <TouchableOpacity onPress={() => settingsNav()}><SettingsIcon action={settingsNav} /></TouchableOpacity>
        });
    }, [props.navigation])

    const settingsNav = () => {
        dispatch(openSettings())
    };

    return (
        <View style={styles.container}>
            <ListItem 
                key={'roomName'}
                title={props.route.params.roomName}
                subtitle={"Power: "+props.route.params.roomCurrentPower}
                titleStyle={{ fontWeight: 'bold'}}
                emptyListComponent={() => {
                    <Text>No devices</Text>
                }}
            />
            <Divider style={{backgroundColor: 'black', height:2}}/>

            <DeviceMenuWrapper roomId={props.route.params.roomId} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default DeviceScreen;