import React from 'react';
import ProgressBar from 'react-native-progress/Bar';

import Colours, { hex2rgba } from '../../constants/Colours';

const UtilisationBar = props => {
    /*
        PROPS:
            value -> value for the progress bar
            maxIsBad -> >80% colours the bar red
    */

    const pickColour = () => {
        let barColour;
        if (props.value >= 0.8) {
            barColour = props.maxIsBad ? Colours.efficiency_min : Colours.efficiency_max
        } else if (props.value < 0.8 && props.value >= 0.6) {
            barColour = props.maxIsBad ? Colours.efficiency_mid_low : Colours.efficiency_mid_high
        } else if (props.value < 0.6 && props.value >= 0.4) {
            barColour = Colours.efficiency_mid
        } else if (props.value < 0.4 && props.value >= 0.2) {
            barColour = props.maxIsBad ? Colours.efficiency_mid_high : Colours.efficiency_mid_low
        } else if (props.value < 0.2) {
            barColour = props.maxIsBad ? Colours.efficiency_max : Colours.efficiency_min
        }

        const colour = hex2rgba(barColour);
        return colour;
    }

    return (
        <ProgressBar
            {...props}
            progress={props.value}
            color={pickColour()}
        />
    );

}

export default UtilisationBar;