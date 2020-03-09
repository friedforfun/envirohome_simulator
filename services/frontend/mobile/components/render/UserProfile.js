import React from 'react';
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
                    <Text>
                        User profile settings buttons here.
                    </Text>
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
    controls: {
        flexDirection: 'row',
        justifyContent: 'center'

    }
});

export default UserProfile;