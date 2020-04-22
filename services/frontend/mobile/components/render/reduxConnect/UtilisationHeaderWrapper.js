import { connect } from 'react-redux';

import UtilisationHeader from '../UtilisationHeader';
import { houseHoldPowerStats } from '../../../store/selectors/device';


const mapStateToProps = (state, ownProps) => {
    return houseHoldPowerStats(state, ownProps)


}

export default connect(mapStateToProps)(UtilisationHeader);