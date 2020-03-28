import { SIGNUP, AUTHENTICATE, LOGOUT, SET_DID_TRY_AL, REQUEST_PENDING, REQUEST_ERROR } from '../actions/auth';

const initialState = {
    username: null,
    email: null,
    authToken: null,
    data: null,
    error: null
};
 
export default AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                data: action.payload,
            };
        case SET_DID_TRY_AL:
            return {
                ...state,
            };
        case LOGOUT:
            return {
                ...initialState,
            };
        case SIGNUP:
            console.log("Token:"+action.payload.data.user_id)
            console.log("Auth token stored.")
            return {
                username: action.payload.config.username,
                email: action.payload.config.email,
                authToken:action.payload.data.user_id
            };
        case REQUEST_PENDING:
            return {
                ...state
            }
        case REQUEST_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
};
