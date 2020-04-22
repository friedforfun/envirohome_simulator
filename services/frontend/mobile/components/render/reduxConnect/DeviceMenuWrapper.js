import { connect } from 'react-redux';

import DeviceMenu from '../DeviceMenu';

const mapStateToProps = (state, ownProps) => {
    const deviceStore = state.deviceStore.devices;
    const deviceArr = deviceStore.filter(device => device.room_id === ownProps.roomId);

    if (deviceArr !== undefined && deviceArr !== null){
        return {
            ...ownProps,
            deviceArray: deviceArr
        }
    }


}

export default connect(mapStateToProps)(DeviceMenu)