import { Alert } from 'react-native';
export const handleError = response => {
    if (response.ok || response.status === 200){
        return response;
    } else {
        switch(response.status){
            case 400: 
                console.log("Validation Error")
                throw new Error("400")

            case 401:
                console.log("Incorrect User Credentials")
                throw new Error("401")
            
            case 404:
                console.log("Object not found")
                throw new Error("404")

            case 409:
                console.log("Email or username is taken")
                throw new Error("409")
            
            default:
                console.log("Unidentified error")
                throw new Error("Unknown Eroor")
        }
    }
}

export const loginError = error => {
    switch(error.message){
        case "400": 
            return("Invalid email, or password")

        case "401":
            return("Incorrect user credentials")
        
        case "Registration failed":
            console.log("fail silently")
            return ("")

        case "Network request failed":
            return("Network issue, check connection or try again")

        default:
            console.log("Unexpected login error")
            //console.log(JSON.stringify(error))
            console.log(error.message)
            console.log(error.stack)
            return("")
    }
}

export const loginWarning = (error, loading) => {
    const msg = loginError(error)
    if (msg != "") {
        Alert.alert(
            'Login Error',
            msg,
            [
                { text: 'OK', onPress: () => { loading } },
            ],
            { cancelable: false },
        );
    } else {
        loading()
    }
}

export const regWarning = (msg, loading) => {
    Alert.alert(
        'Registration Error',
        msg,
        [
            { text: 'OK', onPress: () => { loading } },
        ],
        { cancelable: false },
    );
}

export const registered = bool => {
    return new Promise((resolve, reject) => {
        if (bool) resolve("Register success")
        else reject(Error("Registration failed"))
    })
} 