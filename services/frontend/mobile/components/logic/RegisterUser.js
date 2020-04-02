import URL from '../../constants/URL';


const RegisterUser = (user, pword, email) => {
  const path = URL.base + URL.auth + URL.register;

  return fetch(path, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Connection': 'close'
    },
    body: JSON.stringify({
      username: user,
      password: pword,
      email: email
    })
  }).then(response => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
} 

export default RegisterUser;