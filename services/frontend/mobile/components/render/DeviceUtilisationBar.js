import React from 'react';
import PropTypes from 'prop-types';

import UtilisationBar from './UtilisationBar';

const DeviceUtilisationBar = props => {

    const val = props.rawUsageVal / props.deviceRp

    return (
        <UtilisationBar 
            {...props}
            value={val}
            animationConfig={{ bounciness: 10 }}
            height={30}
        />
    );
}

DeviceUtilisationBar.defaultProps = {
    rawUsageVal: 0,
    deviceRp: 0
}

DeviceUtilisationBar.propTypes = {
    rawUsageVal: PropTypes.number.isRequired,
    deviceRp: PropTypes.number.isRequired
}


export default DeviceUtilisationBar;