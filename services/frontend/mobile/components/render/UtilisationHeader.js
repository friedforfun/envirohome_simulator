import React, { useState } from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Col, Grid } from 'react-native-easy-grid';

import Colours, { hex2rgba } from '../../constants/Colours';
import { useInterval } from '../logic/useInterval';
import UtilisaionBar from './UtilisationBar';

const UtilisationHeader = props => {

    

    const [usage, setUsage] = useState(1);
    const [powerLimit, setPowerLimit] = useState(0)

    const maxRatedPower = useSelector(state => state.settingsStore.maxRatedPower)

    useInterval(() => {
        setPowerLimit(maxRatedPower)
        // fetch current total power usage from eventstore here
        setUsage(Math.random())
    }, 1000);


    return (
        <Grid {...props} style={styles.gridStyle}>
            <Col style={styles.columnStyle}>
                <Text style={styles.textColour}>Energy Utility: {Math.trunc(usage * 100)}%</Text>
                <Text style={styles.textColour}>Max rated power: {powerLimit}</Text>
                <UtilisaionBar
                    value={usage}
                    height={14}
                    width={null}
                    animationConfig={{ bounciness: 10 }}
                />
            </Col>
        </Grid>

       
    );

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