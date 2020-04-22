import * as lodash from 'lodash/fp';
import produce from 'immer';

export const validDataTypes = {
    FROM_NOW: "fromNow",
    LAST_HOUR: "lastHour",
    LAST_DAY: "lastDay",
    ALL_TIME: "allTime"
}

import { ADD_DATA_POINT, CLEAR_DATA } from '../actions/charts'

const initialState = {
    "fromNow": {},
    "lastHour": {},
    "lastDay": {},
    "allTime": {}
}; 

const ChartReducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_DATA_POINT:
            const newObj = { 
                "data": action.val,
                "timeStamp": action.timeStamp, 
                "fetch_id": action.fetchId 
            }
            const device_id = action.deviceId

            if (state[action.dataType][device_id] !== undefined){

                var mutator = lodash.cloneDeep(state[action.dataType][device_id])

                const checkFetchId = mutator.findIndex(element => {
                    element.fetchId === action.fetchId
                })
                if (checkFetchId < 0){
                    
                    mutator.push(newObj)
                    return { ...state, [action.dataType]: {...state[action.dataType], [device_id]: mutator} };
                }
                break;
            } else {
                return { ...state, [action.dataType]: {...state[action.dataType], [device_id]: [newObj]} };
            }
        
        case CLEAR_DATA:
            return { ...state, [action.dataType]: [] }


        default:
            return state

    }
}

export default ChartReducer;