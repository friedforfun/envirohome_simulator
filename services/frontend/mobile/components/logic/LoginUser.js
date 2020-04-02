import URL from '../../constants/URL';

const LoginUser = async (email, pword) => {

    const path = URL.base + URL.auth + URL.login;

    const response = await fetch(path, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Connection': 'close'
        },
        body: JSON.stringify({
            email: email,
            password: pword
        })
    });

    return await response.json();
} 


export default LoginUser;