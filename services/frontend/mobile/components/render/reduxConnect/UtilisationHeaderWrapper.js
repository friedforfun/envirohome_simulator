import { connect } from 'react-redux';
import * as lodash from 'lodash/fp';

import UtilisationHeader from '../UtilisationHeader';


const mapStateToProps = (state, ownProps) => {
    const rating = lodash.cloneDeep(state.settingsStore.maxRatedPower)
    const power = lodash.cloneDeep(state.settingsStore.houseHoldPower)
    
    if (rating !== undefined && rating !== null) {
        if (power !== undefined && power !== null){
            return {
                ...ownProps,
                maxRatedPower: rating,
                householdPower: power
            }
        }
        return {
            ...ownProps,
            maxRatedPower: rating
        }
    }
    if (power !== undefined && power !== null) {
        return {
            ...ownProps,
            householdPower: power
        }
    }
    return {
        ...ownProps,
        maxRatedPower: 1,
        householdPower: 1
    }


}

export default connect(mapStateToProps)(UtilisationHeader);