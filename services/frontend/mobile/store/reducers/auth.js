import { SIGNUP, LOGIN, LOGOUT, SET_DID_TRY_AL, REQUEST_PENDING, REQUEST_ERROR } from '../actions/auth';
import { log } from '../../components/logic/PostLog';

const initialState = {
    username: null,
    user_id: null,
    email: null,
    authToken: null,
    error: null
}; 

export default AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            console.log("LOGIN: "+JSON.stringify(action.payload.token))
            log(action.payload.email, 2, "User login", "Login");
            return {
                email: action.payload.email,
                authToken: action.payload.token,
                email: action.payload.email,
                user_id: action.payload.user_id
            };
        case SET_DID_TRY_AL:
            return {
                ...state,
            };
        case LOGOUT:
            log(state.email, 4, "User logout", "Logout");
            return {
                ...initialState,
            };
        case SIGNUP:
            console.log("SIGNUP: "+action.payload.user_id);
            log(action.payload.email, 1, "User signup", "Signup");
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
