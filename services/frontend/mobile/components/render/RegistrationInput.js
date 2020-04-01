import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Input, Icon } from 'react-native-elements';

import FormInput from './FormInput';

const RegistrationInput = props => {

    // check password matches password re-enter

    return (
        <View>
            <FormInput
                id="username"
                label="Username"
                required
                errorText="Please enter a valid username"
                autoCapitalize="none"
                returnKeyType="next"
                initialValue=""
                onInputChange={props.inputChangeHandler}
                onEndEditing={() => console.log('End editing')}
                onSubmitEditing={() => console.log('Submit editing')}
                leftIcon={
                    <Icon
                        name='person'
                        type='octicon'
                        size={24}
                        iconStyle={styles.iconStyle}
                    />
                }
            />
            <FormInput
                id="email"
                label="Email"
                email
                required
                errorText="Please enter a valid email"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                onInputChange={props.inputChangeHandler}
                onEndEditing={() => console.log('End editing')}
                onSubmitEditing={() => console.log('Submit editing')}
                initialValue=""
                leftIcon={
                    <Icon
                        name='mail'
                        type='octicon'
                        size={24}
                        iconStyle={styles.iconStyle}
                    />
                }
            />
            <FormInput
                id="password"
                required
                label="Password"
                errorText="Please enter a valid password"
                keyboardType="default"
                secureTextEntry
                autoCapitalize="none"
                returnKeyType="next"
                minLength={6}
                onInputChange={props.inputChangeHandler}
                onEndEditing={() => console.log('End editing')}
                onSubmitEditing={() => console.log('Submit editing')}
                initialValue=""
                leftIcon={
                    <Icon
                        name='lock'
                        type='octicon'
                        size={20}
                        iconStyle={styles.iconStyle}
                    />
                }
            />
            <FormInput
                id="password2"
                required
                label="Re-enter password"
                errorText="Passwords to not match"
                keyboardType="default"
                secureTextEntry
                autoCapitalize="none"
                returnKeyType="done"
                minLength={6}
                onInputChange={props.inputChangeHandler}
                onEndEditing={() => console.log('End editing')}
                onSubmitEditing={() => console.log('Submit editing')}
                initialValue=""
                leftIcon={
                    <Icon
                        name='lock'
                        type='octicon'
                        size={24}
                        iconStyle={styles.iconStyle}
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
    iconStyle: {
        margin: 5
    }
});

export default RegistrationInput;