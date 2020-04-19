import {connect} from 'react-redux';

import Chart from '../Chart';
import { validDataTypes as cType } from '../../../store/reducers/charts'

const mapStateToProps = (state, ownProps) => {

    return{
        ...ownProps,
        plotData: state.chartStore[cType.FROM_NOW][ownProps.deviceId]
    }
}

export default connect(mapStateToProps)(Chart)