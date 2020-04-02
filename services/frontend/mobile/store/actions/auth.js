import { AsyncStorage } from 'react-native';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const REQUEST_PENDING = 'REQUEST_PENDING';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';



let timer;

export const fetchingData = () => ({
    type: API_PENDING
});

export const fetchError = error => ({
    type: ACTION_TYPES.API_ERROR,
    payload: error
});

export const setDidTryAL = () => {
    return { type: SET_DID_TRY_AL };
};

export const authenticate = (userId, token, expiryTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime));
        dispatch({ type: AUTHENTICATE, userId: userId, token: token });
    };
};

export const signup = payload => {
    //console.log(payload);
    //console.log("SIGNUP. user id: "+payload.data.user_id);
    //console.log("signup action dispatched to store!")
    return {
        type: SIGNUP,
        payload: payload,
    }
}

export const login = payload => {
    //console.log(payload);
    //console.log("LOGIN. Auth Token: "+JSON.stringify(payload.data.token));
    return {
        type: LOGIN,
        payload: payload
    }
};

export const logout = () => {
    clearLogoutTimer();
    AsyncStorage.removeItem('userData');
    return { type: LOGOUT };
};

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
};

const setLogoutTimer = expirationTime => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    };
};

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token: token,
            userId: userId,
            expiryDate: expirationDate.toISOString()
        })
    );
};
