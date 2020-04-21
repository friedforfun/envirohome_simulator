import { connect } from 'react-redux';
import * as lodash from 'lodash/fp';

import UtilisationHeader from '../UtilisationHeader';


const mapStateToProps = (state, ownProps) => {
    const rating = lodash.cloneDeep(state.settingsStore.maxRatedPower)
    
    if (rating !== undefined && rating !== null) {
        return {
            ...ownProps,
            maxRatedPower: rating
        }
    }
    return {
        ...ownProps,
        maxRatedPower: 1
    }


}

export default connect(mapStateToProps)(UtilisationHeader);