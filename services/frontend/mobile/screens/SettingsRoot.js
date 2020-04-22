import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import SettingsMenu from '../components/render/settings/SettingsMenu';
import HomeIcon from '../components/render/HomeIcon';
import { closeSettings } from '../store/actions/settings';

const SettingsScreen = props => {
    const dispatch = useDispatch();
    
    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => <TouchableOpacity onPress={() => settingsNav()} ><HomeIcon action={settingsNav} /></TouchableOpacity>
        });
    }, [props.navigation])

    const settingsNav = () => {
        dispatch(closeSettings())
    };


    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                <SettingsMenu />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default SettingsScreen;