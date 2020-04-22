import { connect } from 'react-redux';

import { getVisibleDeviceUsage } from '../../../store/selectors/device'
import ChartData from '../ChartData';

const mapStateToProps = (state, ownProps) => {
    const visibleDevices = getVisibleDeviceUsage(state);
    //console.log(visibleDevices);
    if (visibleDevices !== undefined && visibleDevices !== null){
        return {
            ...ownProps,
            visibleDevices: visibleDevices
        }
    }
    return {
        ...ownProps,
        visibleDevices: []
    }
}

export default connect(mapStateToProps)(ChartData)