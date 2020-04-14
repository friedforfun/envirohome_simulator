import React from 'react';
import { View } from 'react-native';

import LogViewer from '../components/render/settings/LogViewer';
import ManageUsers from '../components/render/settings/ManageUsers';
import NotificationSettings from '../components/render/settings/NotificationSettings';
import PowerManager from '../components/render/settings/PowerManager';
import RoomEditor from '../components/render/settings/RoomEditor';
import StatsPage from '../components/render/settings/StatsPage';

const SettingsContent = props => {
    const content = props.route.params.content;

    return (
        <View>
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