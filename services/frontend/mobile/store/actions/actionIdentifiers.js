// All these should be re-exported from their action script
// this is to ensure that all actions have a unique type assigned to them
// and that the correct type is used when dispatching an action


// auth
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REQUEST_PENDING = 'REQUEST_PENDING';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

// chart
export const ADD_DATA_POINT = 'ADD_DATA_POINT'
export const CLEAR_DATA = 'CLEAR_DATA'

// devices
export const ADD_DEVICE = 'ADD_DEVICE';
export const REMOVE_DEVICE = 'REMOVE_DEVICE';
export const POPULATE_DEVICES = 'POPULATE_DEVICES';
export const CLEAR_DEVICE_STORE = 'CLEAR_DEVICE_STORE';
export const UPDATE_DEVICE = 'UPDATE_DEVICE';
export const SET_USAGE_VAL = 'SET_USAGE_VAL';

// rooms
export const ADD_ROOM = 'ADD_ROOM';
export const REMOVE_ROOM = 'REMOVE_ROOM';
export const UPDATE_ROOM = 'UPDATE_ROOM';
export const POPULATE_ROOMS = 'POPULATE_ROOMS';
export const CLEAR_ROOM_STORE = 'CLEAR_ROOM_STORE';

// settings
export const OPEN_SETTINGS = 'OPEN_SETTINGS';
export const CLOSE_SETTINGS = 'CLOSE_SETTINGS';
export const UPDATE_MAX_RATED_POWER = 'UPDATE_MAX_RATED_POWER'