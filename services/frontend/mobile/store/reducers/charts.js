import * as lodash from 'lodash/fp';
import produce from 'immer';

import { ADD_DATA_POINT } from '../actions/charts'

const initialState = {

};

const ChartReducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_DATA_POINT:
            const newObj = { "data": action.val, "timeStamp": action.timeStamp, "fetch_id": action.fetchId }
            const device_id = action.deviceId

            if (state[device_id] !== undefined){
                const checkFetchId = state[device_id].find(element => {
                    element.fetchId === action.fetchId
                })
                if (checkFetchId == undefined){
                    var mutator = lodash.cloneDeep(state[device_id])
                    mutator.push(newObj)
                    return {...state, [device_id]: mutator};
                }
                break;
            } else {
                return {...state, [device_id]: [newObj]};
            }
        



        default:
            return state

    }
}

export default ChartReducer;