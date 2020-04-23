import { createSelector } from 'reselect'

import { validDataTypes as cType } from '../reducers/charts'

const deviceArray = (state) => state.deviceStore.devices;
const deviceUsage = (state) => state.deviceStore.deviceUsage;
const totalRatedPower = (state) => state.settingsStore.maxRatedPower;
const currentPower = (state) => state.settingsStore.houseHoldPower;
const livePlotData = (state, props) => state.chartStore[cType.FROM_NOW];
const hourPlotData = (state, props) => state.chartStore[cType.LAST_HOUR];
const dayPlotData = (state, props) => state.chartStore[cType.LAST_DAY];
const allTimePlotData = (state, props) => state.chartStore[cType.ALL_TIME];
const plotPointLim = (state) => state.chartStore.plotPointLimit;

const recieveProps = (_, props) => props;

export const findDeviceById = createSelector(
    [deviceArray, recieveProps],
    (deviceArray, recieveProps) => {
        deviceArray.find(device => device.device_id == recieveProps.deviceId)
    }
)

export const devicesByRoomId = createSelector(
    [deviceArray, recieveProps],
    (deviceArray, recieveProps) => {
        return deviceArray.filter(device => (device.room_id === recieveProps.roomId))
    }
)

export const getVisibleDeviceUsage = createSelector(
    [deviceUsage],
    (deviceUsage) => {
        return deviceUsage.filter(device => device.isVisible === true)
    }
)

export const getCurrentDeviceUsage = createSelector(
    [deviceUsage, recieveProps],
    (deviceUsage, recieveProps) => {
        return deviceUsage.find(entry => entry.device_id === recieveProps.deviceId)
    }
)

export const getDeviceArrayByRoom = createSelector(
    [deviceArray, recieveProps],
    (deviceArray, recieveProps) => {
        return deviceArray.filter(device => device.room_id === recieveProps.roomId);
    }
)

export const houseHoldPowerStats = createSelector(
    [totalRatedPower, recieveProps, currentPower],
    (totalRatedPower, recieveProps, currentPower) => {
        if (totalRatedPower !== undefined && totalRatedPower !== null) {
            if (currentPower !== undefined && currentPower !== null) {
                return {
                    ...recieveProps,
                    maxRatedPower: totalRatedPower,
                    householdPower: currentPower
                }
            }
            return {
                ...recieveProps,
                maxRatedPower: totalRatedPower
            }
        }
        if (currentPower !== undefined && currentPower !== null) {
            return {
                ...recieveProps,
                householdPower: currentPower
            }
        }
        return {
            ...recieveProps,
            maxRatedPower: 1,
            householdPower: 1
        }
    }
)

export const liveDataSlice = createSelector(
    [livePlotData, recieveProps, plotPointLim],
    (livePlotData, recieveProps, plotPointLim) => {
        const deviceId = recieveProps.deviceId.toString()
        const dataPoints = plotPointLim[recieveProps.deviceId];
        let data = livePlotData[deviceId]
        if (data !== undefined && dataPoints !== undefined) {
            if (data.length > dataPoints && data.length >= 2) {
                data = data.slice(data.length - dataPoints, data.length)
            }
            return {
                ...recieveProps,
                plotData: data.map(element => (element.data)),
            }
        } else if (data !== undefined) {
            if (data.length > plotPointLim.default && data.length >= 2) {
                data = data.slice(data.length - plotPointLim.default, data.length)
            }
        }
        return {
            ...recieveProps,
            plotData: [0, 0],
        }
    }
)