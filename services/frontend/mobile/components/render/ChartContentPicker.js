import React from 'react';
import { Picker, Item, Form, Icon } from 'native-base';
import PropTypes from 'prop-types';

const ChartContentPicker = props => {

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
                selectedValue={() => console.log("Select value")}
                onValueChange={() => console.log("change value")}
            >
                <Picker.Item label="Real time" value="key0" />
                <Picker.Item label="Last hour" value="key1" />
                <Picker.Item label="Last day" value="key2" />
                <Picker.Item label="All time" value="key3" />
            </Picker>
        </Form>
    )
}

ChartContentPicker.propTypes = {
    // need onValueChangeHandler function
    // selectedValue string
}

export default ChartContentPicker;