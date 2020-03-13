import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://192.168.86.26:5000';


const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

const RegisterUser = (user, pword, email) => {
    // state hooks
    const [thisState, nextState] = useState({ gotResponse: false, response: { } });

    // update function
    const saveResponse = (result) => {
        nextState({
            gotResponse: true,
            response: result
        })
    }

    useEffect(() => {
        instance.post('/auth/register', 
        {
            username: user,
            password: pword,
            email: email
          })
          .then(response => {
            console.log(response);
            saveResponse(response);
          })
          .catch((error) => console.log( error.response ) );
    }, []);

    
    return thisState.data;
}

export default RegisterUser;