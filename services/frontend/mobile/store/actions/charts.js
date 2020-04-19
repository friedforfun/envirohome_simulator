export const ADD_DATA_POINT = 'ADD_DATA_POINT'
export const CLEAR_DATA = 'CLEAR_DATA'

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
 