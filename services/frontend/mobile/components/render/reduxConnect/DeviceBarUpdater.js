import { connect } from 'react-redux';

import DeviceUtilisationBar from '../DeviceUtilisationBar';
import { getCurrentDeviceUsage } from '../../../store/selectors/device';

const mapStateToProps = (state, ownProps) => {
    const data = getCurrentDeviceUsage(state, ownProps)
    
    if (data !== undefined){
        return {
            ...ownProps,
            rawUsageVal: data.usage.usage
    }
    }
    return{
        ...ownProps,
        rawUsageVal: 0
    }
        
}

export default connect(mapStateToProps)(DeviceUtilisationBar)