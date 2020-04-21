import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';


const UsageText = props => {
/*
    props:
        rawUsageVal
*/
    return (
        <Text>{props.rawUsageVal} / {props.ratedPower} Watts</Text>
    )
}


UsageText.propTypes = {
    rawUsageVal: PropTypes.number.isRequired,
    ratedPower: PropTypes.number.isRequired
}

export default UsageText;