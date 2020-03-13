import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://192.168.86.26:5000';


var instance = axios.create({
    baseURL: BASE_URL,
    timeout: 1500,
    //headers: {'X-Custom-Header': 'foobar'}
  });

const RegisterUser = (user, pword, email) => {
    // state hooks
    const [thisState, nextState] = useState({ isPosted: false, response: { } });

    // update function
    const endPost = (result) => {
        nextState({
            isPosted: true,
            response: result
        })
    }

    useEffect(() => {
        axios.post('http://192.168.86.26:5000/auth/register', 
        {
            username: 'user',
            password: 'pword',
            email: 'email@someemail.com'
          }, {
            headers: {
                'Content-Type': 'application/json'
            }})
          .then(response => {
            console.log(response);
            endPost(response);
          })
          .catch((error) => console.log( error.response ) );
    }, []);

    
    return thisState;
}

export default RegisterUser;