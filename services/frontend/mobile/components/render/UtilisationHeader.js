import React, { useState, useEffect } from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Colours, { hex2rgba } from '../../constants/Colours';
import { useInterval } from '../logic/useInterval';
import UtilisaionBar from './UtilisationBar';
import { fetchHead } from '../logic/HomePower'
import { updateHouseholdPower } from '../../store/actions/settings';

const UtilisationHeader = props => {

    const dispatch = useDispatch();

    const usage = props.householdPower;

    const updateUsage = async () => {
        return await fetchHead("second")
            .then(json => {
                if (json.content.data.usage !== undefined)
                    dispatch(updateHouseholdPower(json.content.data.usage));
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    useInterval(() => {
        // fetch current total power usage from eventstore here
        updateUsage()

    }, 4000);


    useEffect(() =>{
        updateUsage()
    }, [])

    const percentage = (usage / props.maxRatedPower)

    const grade = () => {

        
        // A+ > 0.9
        // A  <= 0.9 && > 0.8
        // B  <= 0.8 && > 0.7
        // C  <= 0.7 && > 0.5
        // D  <= 0.5 && > 0.3
        // E  <= 0.3 && > 0.2
        // F  <= 0.2 && > 0.1
        // G  <= 0.1

        const inversePercentage = 1 - percentage
        switch (true) {
            case  (inversePercentage > 0.9):
                return "A+"

            case (inversePercentage <= 0.9 && inversePercentage > 0.8):
                return "A"
            
            case (inversePercentage <= 0.8 && inversePercentage > 0.7):
                return "B"
            
            case (inversePercentage <= 0.7 && inversePercentage > 0.5):
                return "C"

            case (inversePercentage <= 0.5 && inversePercentage > 0.3):
                return "D"

            case (inversePercentage <= 0.3 && inversePercentage > 0.2):
                return "E"

            case (inversePercentage <= 0.2 && inversePercentage > 0.1):
                return "F"

            case (inversePercentage <= 0.1):
                return "G"

            default:
                return "U"
                break;
        }
    }

    return (
        <Grid {...props} style={styles.gridStyle}>
            <Col style={styles.columnStyle}>
                <Text style={styles.textColour}>Energy Grade: {grade()}</Text>
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
    maxRatedPower: PropTypes.number.isRequired,
    householdPower: PropTypes.number.isRequired
}

const styles = StyleSheet.create({
    textColour: {
        color: Platform.OS === 'android' ? 'white' : Colours.center,
        alignSelf: 'center'
    },
    columnStyle: {
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%'
    },
    gridStyle: {
        width: 250,
        justifyContent: 'center',
        alignContent: 'center',
        
    }

});

export default UtilisationHeader;