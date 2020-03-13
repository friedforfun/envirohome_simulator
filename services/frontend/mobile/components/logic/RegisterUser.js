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
        axios.post('/auth/register', {
            username: user,
            password: pword,
            email: email
          })
          .then(response => {
            console.log(response);
            //endPost(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }, []);

    
    return thisState.response;
}

export default RegisterUser;