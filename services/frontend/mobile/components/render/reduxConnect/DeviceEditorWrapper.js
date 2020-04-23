import { connect } from 'react-redux';

import DeviceEditor from '../settings/DeviceEditor';
import { devicesByRoomId } from '../../../store/selectors/device';

const mapStateToProps = (state, ownProps) => {

    return {
        ...ownProps,
        deviceList: devicesByRoomId(state, ownProps)
    }
}

export default connect(mapStateToProps)(DeviceEditor)