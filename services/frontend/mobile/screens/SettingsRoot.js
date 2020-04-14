import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import SettingsMenu from '../components/render/SettingsMenu';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import HomeIcon from '../components/render/HomeIcon';
import { closeSettings } from '../store/actions/settings';

const SettingsScreen = props => {
    const dispatch = useDispatch();

    const nav = useNavigation();
    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => <TouchableOpacity><HomeIcon action={settingsNav} /></TouchableOpacity>
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