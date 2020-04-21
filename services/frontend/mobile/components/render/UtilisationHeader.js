import React, { useState, useEffect } from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import PropTypes from 'prop-types';

import Colours, { hex2rgba } from '../../constants/Colours';
import { useInterval } from '../logic/useInterval';
import UtilisaionBar from './UtilisationBar';
import { fetchHead } from '../logic/HomePower'

const UtilisationHeader = props => {
    const [usage, setUsage] = useState(props.maxRatedPower/2);

    useInterval(() => {
        // fetch current total power usage from eventstore here
        fetchHead("second")
            .then(json =>{
                if (json.content.data.usage !== undefined)
                    setUsage(json.content.data.usage);
            })
            .catch(error => {
                console.log(error.message)
            })

    }, 5000);

    const updateUsage = data => {
        setUsage(data)
    }

    useEffect(() =>{
        fetchHead("second")
            .then(json => {
                if (json.content.data.usage !== undefined)
                    setUsage(json.content.data.usage);
            })
            .catch(error => {
                console.log(error.message)
            })
    }, [])

    const percentage = (usage / props.maxRatedPower)

    return (
        <Grid {...props} style={styles.gridStyle}>
            <Col style={styles.columnStyle}>
                <Text style={styles.textColour}>Energy Utility: {Math.trunc(100-((usage/props.maxRatedPower)*100))}%</Text>
                <Text style={styles.textColour}>Max rated power: {props.maxRatedPower}</Text>
                <UtilisaionBar
                    value={percentage}
                    height={14}
                    width={null}
                    animationConfig={{ bounciness: 10 }}
                    maxIsBad={true}
                />
            </Col>
        </Grid>

       
    );

}

UtilisationHeader.propTypes = {
    maxRatedPower: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.object
    ]).isRequired
}

const styles = StyleSheet.create({
    textColour: {
        color: Platform.OS === 'android' ? 'white' : Colours.center
    },
    columnStyle: {
        width: '100%'
    },
    gridStyle: {
        width: 250,
        
    }

});

export default UtilisationHeader;