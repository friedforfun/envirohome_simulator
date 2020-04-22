import { connect } from 'react-redux';

import ChartData from '../ChartData';

const mapStateToProps = (state, ownProps) => {
    // map visible devices to props
    const deviceStore = state.deviceStore.deviceUsage;
    const visibleDevices = deviceStore.filter(device => device.isVisible === true)
    //console.log(visibleDevices)
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