import {connect} from 'react-redux';

import Chart from '../Chart';
import { validDataTypes as cType } from '../../../store/reducers/charts'

const mapStateToProps = (state, ownProps) => {
    const dataPoints = ownProps.chartSize;
    const rawData = state.chartStore[cType.FROM_NOW][ownProps.deviceId]
    let data
    if (rawData !== undefined){
        if (rawData.length > dataPoints && rawData.length >= 2) {
            //console.log(rawData)
            data = rawData.slice(rawData.length - dataPoints, rawData.length)
        } else {
            data = rawData
        }

        return {
            ...ownProps,
            plotData: data
        }
    }
    return {
        ...ownProps,
        plotData: [0, 0]
    }
}

export default connect(mapStateToProps)(Chart)