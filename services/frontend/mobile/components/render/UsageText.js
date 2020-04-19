import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';


const UsageText = props => {
/*
    props:
        rawUsageVal
*/
    var humanReadable = Math.trunc(((props.rawUsageVal) * (props.ratedPower / 3600000.0)) * 3600000.0)
    return (
        <Text>{humanReadable} / {props.ratedPower} Watts</Text>
    )
}


UsageText.propTypes = {
    rawUsageVal: PropTypes.number.isRequired,
    ratedPower: PropTypes.number.isRequired
}

export default UsageText;