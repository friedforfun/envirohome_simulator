import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Divider, ListItem } from 'react-native-elements'
import { useDispatch } from 'react-redux';

import DeviceMenuWrapper from '../components/render/reduxConnect/DeviceMenuWrapper';
import SettingsIcon from '../components/render/settings/SettingsIcon';
import { openSettings } from '../store/actions/settings';

const DeviceScreen = props => {

    const dispatch = useDispatch();
    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => <TouchableOpacity><SettingsIcon action={settingsNav} /></TouchableOpacity>
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
            />
            <Divider style={{backgroundColor: 'black', height:2}}/>
            <ScrollView style={styles.content}>
                <DeviceMenuWrapper roomId={props.route.params.roomId} />
            </ScrollView>
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