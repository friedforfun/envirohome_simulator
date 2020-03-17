import React, { useState } from 'react';
import { Text, View } from 'react-native';

const RegistrationInput = props => {
    const [userId, setUserId] = useState('');
    const [formIsValid, setFormIsValid] = useState(false);

    // check validity of userID
    const userIdChangeHandler = text => {
        if (text.trim().length === 0) {
            setUserId(text);
        } else {
            setIdIsValid(true);
        }
    }

    // check validity of email
    // regex: /^([a-zA-Z0-9]|[^.!#$%&'*+/=?^_`{|}~-])+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    
    // check validity of password && matches password re-enter

    return (
        <View style={styles.container}>
            <Text>User ID*</Text>
            <Input
                value={userId}
                onChange={}
                autoCapitalize='none'
                keyboardType='default'
                returnKeyType='next'
                onEndEditing={() => console.log('ID validation')}
                onSubmitEditing={() => console.log('focus: email input')}
                placeholder='User ID'
                leftIcon={
                    <Icon
                        name='person'
                        type='octicon'
                        size={24}
                    />
                }
            />
            <Text>Email*</Text>
            <Input
                autoCapitalize='none'
                keyboardType='email-address'
                placeholder='Email'
                returnKeyType='next'
                onEndEditing={() => console.log('email validation')}
                onSubmitEditing={() => console.log('focus: password input')}
                leftIcon={
                    <Icon
                        name='mail'
                        type='octicon'
                        size={24}
                    />
                }
            />
            <Text>Password*</Text>
            <Input
                autoCapitalize='none'
                keyboardType='default'
                secureTextEntry='true'
                placeholder='Password'
                returnKeyType='next'
                onEndEditing={() => console.log('password validation')}
                onSubmitEditing={() => console.log('focus: password confirm input')}
                leftIcon={
                    <Icon
                        name='lock'
                        type='octicon'
                        size={24}
                    />
                }
            />
            <Text>Re-enter Password*</Text>
            <Input
                autoCapitalize='none'
                keyboardType='default'
                secureTextEntry='true'
                placeholder='Password'
                returnKeyType='done'
                onEndEditing={() => console.log('password validation')}
                onSubmitEditing={() => console.log('submit form')}
                leftIcon={
                    <Icon
                        name='lock'
                        type='octicon'
                        size={24}
                    />
                }
            />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
});

export default RegistrationInput;