import { ADD_DATA_POINT, CLEAR_DATA, UPDATE_PLOT_LIMIT } from './actionIdentifiers';
export { ADD_DATA_POINT, CLEAR_DATA, UPDATE_PLOT_LIMIT } from './actionIdentifiers';

export const addDataPoint = (deviceId, data, fetchId, dataType) => ({
    type: ADD_DATA_POINT, 
    val: data.usage, 
    deviceId: deviceId, 
    timeStamp: data.timestamp, 
    fetchId: fetchId,
    dataType: dataType
})

export const clearData = (dataType) => ({
    type: CLEAR_DATA,
    dataType: dataType
})

export const updatePlotLimit = (deviceId, plots) => ({
    type: UPDATE_PLOT_LIMIT,
    deviceId: deviceId,
    numberOfPlots: plots
})
 