import React, { useState } from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import { useSelector } from 'react-redux';

import Colours, { hex2rgba } from '../../constants/Colours';
import { useInterval } from '../logic/useInterval';

const Utilisation = props => {

    const [usage, setUsage] = useState(0.8);

    useInterval(() => {
        // fetch current total power usage from eventstore here
        setUsage(Math.random())
    }, 500);

    const pickColour = () => {
        let barColour;
        if (usage >= 0.8){
            barColour = Colours.efficiency_max
        } else if (usage < 0.8 && usage >= 0.6){
            barColour = Colours.efficiency_mid_high
        } else if (usage < 0.6 && usage >= 0.4){
            barColour = Colours.efficiency_mid
        } else if (usage < 0.4 && usage >= 0.2){
            barColour = Colours.efficiency_mid_low
        } else if (usage < 0.2) {
            barColour = Colours.efficiency_min
        }
        
        const colour = hex2rgba(barColour);
        return colour;
    }

    return (
        <View>
            <Text style={styles.textColour}>Energy Utility: {Math.trunc(usage*100)}%</Text>
            <ProgressBar 
                progress={usage} 
                color={pickColour()}
                height={15} 
            />
        </View>
    );

}

const styles = StyleSheet.create({
    textColour: {
        color: Platform.OS === 'android' ? 'white' : Colours.center
    }
});


export default Utilisation;