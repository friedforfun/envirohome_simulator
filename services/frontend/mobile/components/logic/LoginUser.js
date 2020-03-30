import axios from 'axios';

import URL from '../../constants/URL';

const LoginUser = (user, pword) => {

    const login = axios.create({
        baseURL: URL.base,
        headers: {
            'Content-Type': 'application/json',
            "Connection": "close"
        }
    });

    const path = URL.auth + URL.login;

    return login({
        method: 'post',
        timeout: 8000,
        url: path,
        data: {
            username: user,
            password: pword,
        }
    })
}

export default LoginUser;