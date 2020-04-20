import React, { useState } from 'react';
import { Picker, Item, Form, Icon, View } from 'native-base';
import PropTypes from 'prop-types';

const pickItems = key => {
    switch (key) {
        case "key0":
            // real time
            return (
                <View>

                </View>
            )

        case "key1":
            // last hour
            break;

        case "key2":
        
            break;

        case "key3":

            break;

        default:
            break;
    }
}

const ChartContentPicker = props => {
    const [isVisible, setIsVisible] = useState(true)
    const [selected, setSelected] = useState(props.selected);

    return (
        <Form>
            {true &&
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
                <Picker.Item label="10 seconds" value="key0" />
                <Picker.Item label="30 seconds" value="key1" />
                <Picker.Item label="1 min" value="key2" />
                <Picker.Item label="5 mins" value="key3" />
            </Picker>}
        </Form>
    )
}

ChartContentPicker.propTypes = {
    // need onValueChangeHandler function
    // selectedValue string
}

export default ChartContentPicker;