import { connect } from 'react-redux';

import RoomEditor from '../settings/RoomEditor';

const mapStateToProps = (state, ownProps) => {

    return {
        ...ownProps,
        roomList: state.roomStore.rooms
    }
}

export default connect(mapStateToProps)(RoomEditor)