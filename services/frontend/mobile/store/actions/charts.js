export const ADD_DATA_POINT = 'ADD_DATA_POINT'

export const addDataPoint = (deviceId, data, fetchId) => ({
    type: ADD_DATA_POINT, 
    val: data.usage, 
    deviceId: deviceId, 
    timeStamp: data.timestamp, 
    fetchId: fetchId
})