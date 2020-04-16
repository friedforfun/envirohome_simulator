import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import HomeIcon from '../components/render/HomeIcon';
import { closeSettings } from '../store/actions/settings';
import LogViewer from '../components/render/settings/LogViewer';
import ManageUsers from '../components/render/settings/ManageUsers';
import NotificationSettings from '../components/render/settings/NotificationSettings';
import PowerManager from '../components/render/settings/PowerManager';
import RoomEditor from '../components/render/settings/RoomEditor';
import StatsPage from '../components/render/settings/StatsPage';

const SettingsContent = props => {
    const content = props.route.params.content;

    const dispatch = useDispatch();
    
    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => <TouchableOpacity><HomeIcon action={settingsNav} /></TouchableOpacity>
        });
    }, [props.navigation])

    const settingsNav = () => {
        dispatch(closeSettings())
    };

    return (
        <View style={{flex: 1}}>
            {content === "powerManager" && <PowerManager />}
            {content === "editRooms" && <RoomEditor />}
            {content === "stats" && <StatsPage />}
            {content === "notificationSettings" && <NotificationSettings />}
            {content === "manageUsers" && <ManageUsers />}
            {content === "logs" && <LogViewer />}

        </View>
        

    );
}

export default SettingsContent;