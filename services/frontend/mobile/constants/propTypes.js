import PropTypes from 'prop-types';

export const deviceProp = {
    deviceObj: PropTypes.shape({
            device_id: PropTypes.number.isRequired,
            device_name: PropTypes.string.isRequired,
            is_fault: PropTypes.bool.isRequired,
            is_on: PropTypes.bool.isRequired,
            rated_power: PropTypes.number.isRequired,
            room_id: PropTypes.number.isRequired,
            type: PropTypes.string.isRequired
        })
}

export const deviceArrProp = {
    deviceArr: PropTypes.arrayOf(
        deviceProp.deviceObj
    )
}

export const deviceUsageProp = {
    deviceUsage: PropTypes.shape({
        device_id: PropTypes.number.isRequired,
        room_id: PropTypes.number.isRequired,
        usage: PropTypes.number.isRequired,
        isVisble: PropTypes.bool.isRequired,
    })
}

export const deviceUsageArrProp = {
    deviceUsageArr: PropTypes.arrayOf(
        deviceUsageProp.deviceUsage
    )
}

export const roomProp = {
    roomObj: PropTypes.shape({
        current_power: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object
        ]),
        device_count: PropTypes.number.isRequired,
        room_id: PropTypes.number.isRequired,
        room_name: PropTypes.string.isRequired,
        total_power: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object
        ]),
    }).isRequired
}

export const roomArrProp = {
    roomArr: PropTypes.arrayOf(
        roomProp.roomObj
    )
}