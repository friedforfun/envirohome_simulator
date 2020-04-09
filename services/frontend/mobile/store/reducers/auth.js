import { SIGNUP, LOGIN, LOGOUT, SET_DID_TRY_AL, REQUEST_PENDING, REQUEST_ERROR } from '../actions/auth';

const initialState = {
    username: null,
    user_id: null,
    email: null,
    authToken: null,
    data: null,
    error: null
}; 
 
export default AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            console.log("LOGIN: "+JSON.stringify(action.payload.token))
            return {
                authToken: action.payload.token,
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
            console.log("SIGNUP: "+action.payload.user_id)
            return {
                user_id: action.payload.user_id
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
