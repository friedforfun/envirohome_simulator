import React, { useState } from 'react';
import { Picker, Item, Form, Icon, View } from 'native-base';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { updatePlotLimit } from '../../store/actions/charts';

const ChartContentPicker = props => {
    const [selected, setSelected] = useState("key0");
    const dispatch = useDispatch()

    const onValueChange = (value) => {
        realTimeHandler(value)
        setSelected(value)
    }

    const realTimeHandler = value => {
        switch (value) {
            case "key0":
                // dispatch set plot point limit = 10
                dispatch(updatePlotLimit(props.deviceId, 10))
                break;

            case "key1":
                console.log("dispatch 30s")
                // dispatch set plot point limit = 30
                dispatch(updatePlotLimit(props.deviceId, 30))
                break;

            case "key2":
                // dispatch set plot point limit = 60
                dispatch(updatePlotLimit(props.deviceId, 60))
                break;

            case "key3":
                // dispatch set plot point limit = 300
                dispatch(updatePlotLimit(props.deviceId, 300))
                break;

            default:
                break;
        }
    }

    return (
        <Form>
            <Picker
                mode="dropdown"
                placeholder="Real time"
                iosIcon={<Icon name="arrow-down" />}
                textStyle={{ color: "#5cb85c" }}
                itemStyle={{
                    backgroundColor: "#d3d3d3",
                    marginLeft: 0,
                    paddingLeft: 10
                }}
                itemTextStyle={{ color: '#788ad2' }}
                style={{ width: undefined }}
                selectedValue={selected}
                onValueChange={(val) => onValueChange(val)}
            >
                <Picker.Item label="10 seconds" value="key0" />
                <Picker.Item label="30 seconds" value="key1" />
                <Picker.Item label="1 min" value="key2" />
                <Picker.Item label="5 mins" value="key3" />
            </Picker>
        </Form>
    )
}

ChartContentPicker.propTypes = {
    // need onValueChangeHandler function
    // selectedValue string
}

export default ChartContentPicker;