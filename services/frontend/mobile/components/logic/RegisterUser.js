import axios from 'axios';

import URL from '../../constants/URL';

const RegisterUser = (user, pword, email) => {

  const register = axios.create({
    baseURL: URL.base,
    headers: {
      'Content-Type': 'application/json',
      "Connection": "close"
    }
  });

  const path = URL.auth + URL.register;

  return register({
    method: 'post',
    timeout: 8000,
    url: path,
    data: {
      username: user,
      password: pword,
      email: email
    }
  })
}

export default RegisterUser;