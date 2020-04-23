import * as lodash from 'lodash/fp';
import produce from 'immer';

export const validDataTypes = {
    FROM_NOW: "fromNow",
    LAST_HOUR: "lastHour",
    LAST_DAY: "lastDay",
    ALL_TIME: "allTime"
}

import { ADD_DATA_POINT, CLEAR_DATA, UPDATE_PLOT_LIMIT } from '../actions/charts'


const initialState = {
    "fromNow": {},
    "lastHour": {},
    "lastDay": {},
    "allTime": {},
    "plotPointLimit": {
        "default": 10,
    },
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

                if (state[action.dataType][device_id].length < state.plotPointLimit[device_id]){
                    
                    const checkFetchId = mutator.findIndex(element => {
                        element.fetchId === action.fetchId
                    })
                    if (checkFetchId < 0){
                        
                        mutator.push(newObj)
                        return { ...state, [action.dataType]: {...state[action.dataType], [device_id]: mutator} };
                    }
                    break;
                } else {
                    mutator.shift();
                    mutator.push(newObj)
                    return { ...state, [action.dataType]: { ...state[action.dataType], [device_id]: mutator } };
                }
            } else {
                return { 
                    ...state, 
                    plotPointLimit: {
                        ...state.plotPointLimit,
                        [device_id]: lodash.cloneDeep(state.plotPointLimit.default),
                    },
                    [action.dataType]: {
                        ...state[action.dataType], 
                        [device_id]: [newObj]
                    }
                };
            }
        
        case CLEAR_DATA:
            return { ...state, [action.dataType]: [] }

        case UPDATE_PLOT_LIMIT:
            return {
                ...state,
                plotPointLimit: {
                    ...state.plotPointLimit,
                    [action.deviceId]: action.numberOfPlots
                }
            }
            break;






        default:
            return state

    }
}

export default ChartReducer;