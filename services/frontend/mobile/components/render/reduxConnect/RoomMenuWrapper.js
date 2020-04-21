import { connect } from 'react-redux';

import RoomMenu from '../RoomMenu';

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        roomArray: state.roomStore.rooms,
        deviceArray: state.deviceStore.devices,
    }
}

export default connect(mapStateToProps)(RoomMenu)