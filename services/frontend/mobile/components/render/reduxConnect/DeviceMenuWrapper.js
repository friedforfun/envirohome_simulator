import { connect } from 'react-redux';

import DeviceMenu from '../DeviceMenu';
import { getDeviceArrayByRoom } from '../../../store/selectors/device';

const mapStateToProps = (state, ownProps) => {
    const deviceArr = getDeviceArrayByRoom(state, ownProps)
    if (deviceArr !== undefined && deviceArr !== null){
        return {
            ...ownProps,
            deviceArray: deviceArr,
            authToken: state.authStore.authToken
        }
    }


}

export default connect(mapStateToProps)(DeviceMenu)