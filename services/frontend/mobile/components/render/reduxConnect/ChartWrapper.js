import {connect} from 'react-redux';

import Chart from '../Chart';

const mapStateToProps = (state, ownProps) => {

    return{
        ...ownProps,
        plotData: state.chartStore[ownProps.deviceId]
    }
}

export default connect(mapStateToProps)(Chart)