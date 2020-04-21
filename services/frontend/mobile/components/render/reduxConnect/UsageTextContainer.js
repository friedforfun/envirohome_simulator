import React from 'react';
import { connect } from 'react-redux';

import UsageText from '../UsageText';

const mapStateToProps = (state, ownProps) => {
    const data = state.deviceStore.deviceUsage.find(entry => entry.device_id === ownProps.deviceId)

    if (data !== undefined) {
        return {
            ...ownProps,
            rawUsageVal: data.usage.usage
        }
    }
    return {
        ...ownProps,
        rawUsageVal: 0
    }
}

export default connect(mapStateToProps)(UsageText)