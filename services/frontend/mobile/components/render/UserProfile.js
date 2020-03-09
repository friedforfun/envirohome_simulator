import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Overlay, Avatar } from 'react-native-elements';

const UserProfile = props => {
    /*
        Props:
            handler -> function(boolean)
            visible -> returns: visibility state of this component
    */

    return (
        <Overlay 
            animationType="fade"
            borderRadius={ 15 }
            isVisible={props.visible}
            onBackdropPress={() => props.handler(false) /* call handler function from parent */}
        >
            <Avatar
                size="large"
                rounded
                title="A"
                onPress={() => console.log("Change user Avatar")}
                showEditButton
            />
            <View style={styles.controls}>
                /* render a row of buttons ect here (logout, ...) */
            </View>
        </Overlay>
    );
}

const styles = StyleSheet.create({
    controls: {
        flexDirection: 'row'
    }
});

export default UserProfile;