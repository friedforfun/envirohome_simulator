import URL from '../../constants/URL';


const RegisterUser = async (user, pword, email) => {
  const path = URL.base + URL.auth + URL.register;

  const response = await fetch(path, {
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
  })

  return await response;
} 

export default RegisterUser;