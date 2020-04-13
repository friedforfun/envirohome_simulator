import React, { useReducer, useEffect, forwardRef } from 'react';
import { Input } from 'react-native-elements';
import { View, StyleSheet, Text  } from 'react-native';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';
const INPUT_TOUCHED = 'INPUT_TOUCHED';

const formInputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid
      }
    case INPUT_BLUR:
      return {
        ...state,
        endEdit: true
      }
    case INPUT_TOUCHED:
      return {
        ...state,
        touched: true
      }
    default:
      return state;
  }
};

const FormInput = forwardRef((props, ref) => {
  const [inputState, dispatch] = useReducer(formInputReducer, {
    value: props.initvalue ? props.initvalue : '',
    isValid: props.initValid,
    touched: false,
    endEdit: false
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  // basic input validation
  const textChangeHandler = text => {
    const emailRegex =  /^([a-zA-Z0-9]|[^.!#$%&'*+/=?^_`{|}~-])+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
        isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength){
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
    dispatch({ type: INPUT_TOUCHED })
  }



  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <View style={styles.formControl}>
      <Input
        {...props}
        ref={ref}
        style={styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  formControl: {
    width: '100%'
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  errorContainer: {
    marginVertical: 5
  },
  errorText: {
    fontFamily: 'open-sans',
    color: 'red',
    fontSize: 13
  }
});

export default FormInput;