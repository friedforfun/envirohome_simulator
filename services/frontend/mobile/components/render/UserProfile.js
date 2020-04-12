import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Overlay, Avatar } from 'react-native-elements';
import { useDispatch } from 'react-redux';

import Colours from '../../constants/Colours';
import * as authActions from '../../store/actions/auth';

const UserProfile = props => {
    /*
        Props:
            handler -> function(boolean)
            visible -> returns: visibility state of this component
    */

    const dispatch = useDispatch();

    return (
        <Overlay 
            animationType="fade"
            borderRadius={ 15 }
            isVisible={props.visible}
            onBackdropPress={() => props.handler(false) }
        >
            <View style={styles.content}>
                <View style={styles.avatarMover}>
                    <Avatar
                        size="xlarge"
                        containerStyle={{
                            
                        }}
                        rounded
                        title="A"
                        onPress={() => console.log("Change user Avatar")}
                        showEditButton
                    />
                </View>
                
                <View style={styles.controls}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => { dispatch(authActions.logout()) }}>
                            <Button title="Logout" color={Colours.left} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Overlay>
    );
}

const styles = StyleSheet.create({
    avatarMover:{
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 25,
    },
    content:{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    buttonContainer: {
        minWidth: 250,
        marginTop: 10
    },
    controls: {
        justifyContent: 'center'

    }
});

export default UserProfile;