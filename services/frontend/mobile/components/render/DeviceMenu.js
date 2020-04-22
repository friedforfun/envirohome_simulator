import React, { useState, memo } from 'react';
import { View, Dimensions, StyleSheet, Text, FlatList } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import * as _ from 'lodash/fp';
import { v4 as uuidv4 } from 'uuid';
import { Row, Grid, Col } from 'react-native-easy-grid';
import PropTypes from 'prop-types';

import { deviceArrProp } from '../../constants/propTypes';
import { seed } from "../../utils/uuidSeed";
import TogglePower from '../logic/TogglePower';
import { updateDevice, showDevice, hideDevice } from '../../store/actions/devices';
import { testResponse } from '../logic/fetchFunc';
import { log } from '../logic/PostLog';
import DeviceBarUpdater from './reduxConnect/DeviceBarUpdater';
import UsageTextContainer from './reduxConnect/UsageTextContainer';
import ChartData from './ChartData';
import ChartWrapper from './reduxConnect/ChartWrapper';
import ChartContentPicker from './ChartContentPicker';
import TimeFramePicker from './TimeFramePicker';




const DeviceMenu = React.memo(props => {
    const [deviceExpanded, setDeviceExpanded] = useState([])

    const dispatch = useDispatch();
    const email = useSelector(state => state.authStore.email)

    const togglePower = async device => {

        console.log("Power toggle attempt");

        const flipSwitch = (powerState) => {
            var tempDevice = _.cloneDeep(device)
            const onVal = powerState === "True" || powerState === true ? true : false;
            tempDevice.is_on = onVal;
            return tempDevice
        }

        TogglePower(device, props.authToken)
            .then(response => {
                return testResponse(response)
            })
            .then(ok => {
                return ok.json();
            })
            .then(json => {
                if (json.success){
                    const powerVal = device.is_on ? "False" : "True";
                    if (json.success === "device ID: " + device.device_id + " power is now " + powerVal) {
                        //console.log("Power toggle sucess");
                        log(email, 3, device.device_name + " power toggled (ID: " + device.device_id + ")", device.device_id + "_power_toggled")
                        return powerVal;
                    } else {
                        throw new Error("Client and server out of sync");
                    }
                } else {
                    console.log(json)
                    throw new Error("Undefined toggle power error");
                }
            }).catch(error => {
                console.log(error.message);
                if (error.message === "Network request failed") {
                    log(email, 3, device.device_name + " power toggled (ID: " + device.device_id + ") - with network error", device.device_id + "_power_toggled");
                    return device.is_on ? "False" : "True";
                } else if (error.message === "Client and server out of sync") {
                    log(email, 3, device.device_name + " power toggled (ID: " + device.device_id + ") - with sync error", device.device_id + "_power_toggled");
                    return device.is_on ? "True" : "False";
                } else {
                    throw new Error("Unhandled error: "+error.message)
                }
                
            })
            .then(powerState => {
                return flipSwitch(powerState)
            })
            .then(tDevice => {
                dispatch(updateDevice(tDevice));
            })
            .catch(error => {
                console.log(error.message);
            })    

    }

    const expandDevice = device => {
        if (deviceExpanded.includes(device.device_id)){
            const deviceIndex = deviceExpanded.findIndex(id => id === device.device_id)
            var newExpansionArray = _.cloneDeep(deviceExpanded);
            newExpansionArray.splice(deviceIndex, 1);
            setDeviceExpanded(newExpansionArray);
        } else {
            var newExpansionArray = deviceExpanded.concat(device.device_id);
            setDeviceExpanded(newExpansionArray);
        }
    }

    const keyExtractorFunc = (item, index) => index.toString()

    const renderContent = ({ item }) => (
        <View key={uuidv4({ random: seed() })}>
            <ListItem
                key={uuidv4({ random: seed() })}
                title={item.device_name}
                subtitle={<UsageTextContainer deviceId={item.device_id} ratedPower={item.rated_power} />}
                switch={{
                    value: item.is_on,
                    onValueChange: () => togglePower(item),
                }}
                chevron
                onPress={() => expandDevice(item)}
            />
            <Divider />
            <DeviceBarUpdater
                key={uuidv4({ random: seed() })}
                maxIsBad={true}
                deviceId={item.device_id}
                width={deviceWidth}
                deviceRp={item.rated_power}

            />
            <Divider />
            {deviceExpanded.includes(item.device_id) &&
                <View>
                    <Grid>
                        <Col>
                            <ChartContentPicker />
                        </Col>
                        <Col>
                            <TimeFramePicker />
                        </Col>
                    </Grid>

                    <Grid>
                        <Row style={styles.chartContainer}>
                            <ChartWrapper chartSize={10} deviceId={item.device_id} key={uuidv4({ random: seed() })} />
                        </Row>

                    </Grid>
                </View>
            }
            <Divider style={{ backgroundColor: 'black' }} />
        </View>
    )


    let deviceWidth = Dimensions.get('window').width
    // Create a list of devices using list.map. see: `https://react-native-elements.github.io/react-native-elements/docs/listitem.html`
    return (
        <FlatList
            keyExtractor={keyExtractorFunc}
            data={props.deviceArray}
            renderItem={renderContent}
        />
    )
});

DeviceMenu.propTypes = {
    deviceArray: deviceArrProp.deviceArr.isRequired,
    roomId: PropTypes.number.isRequired
}

const styles = StyleSheet.create({
    chartContainer: {
        justifyContent: "center"
    }
});

export default DeviceMenu;