import React from 'react';
import { connect } from 'react-redux';

import UsageText from '../UsageText';
import { getCurrentDeviceUsage } from '../../../store/selectors/device';

const mapStateToProps = (state, ownProps) => {
    const data = getCurrentDeviceUsage(state, ownProps);
    //console.log(data)
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