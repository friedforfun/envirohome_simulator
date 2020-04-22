import {connect} from 'react-redux';

import Chart from '../Chart';
import { validDataTypes as cType } from '../../../store/reducers/charts'
import { liveDataSlice } from '../../../store/selectors/device';

const mapStateToProps = (state, ownProps) => {
    return liveDataSlice(state, ownProps)
}

export default connect(mapStateToProps)(Chart)