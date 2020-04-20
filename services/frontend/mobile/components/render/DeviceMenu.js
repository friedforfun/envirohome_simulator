import React, { useState } from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import * as _ from 'lodash/fp';
import { v4 as uuidv4 } from 'uuid';
import { Row, Grid, Col } from 'react-native-easy-grid';
import {  } from 'native-base';

import { seed } from "../../utils/uuidSeed";
import TogglePower from '../logic/TogglePower';
import { updateDevice } from '../../store/actions/devices';
import { testResponse } from '../logic/fetchFunc';
import Chart from './Chart';
import { log } from '../logic/PostLog';
import DeviceBarUpdater from './reduxConnect/DeviceBarUpdater';
import UsageTextContainer from './reduxConnect/UsageTextContainer';
import { updateMaxRatedPower } from '../../store/actions/settings';
import ChartData from './ChartData';
import ChartWrapper from './reduxConnect/ChartWrapper';
import ChartContentPicker from './ChartContentPicker';
import TimeFramePicker from './TimeFramePicker';




const DeviceMenu = props => {
/*
    props:
        roomName
        roomID
        deviceArray -> list of devices
*/
    const [deviceExpanded, setDeviceExpanded] = useState([])

    const deviceStore = useSelector(state => state.deviceStore.devices);
    const deviceArr = deviceStore.filter(device => device.room_id === props.roomId);

    const [deviceArray, updateDeviceArray] = useState(deviceArr)  

    const dispatch = useDispatch();
    const email = useSelector(state => state.authStore.email)

    const togglePower = async device => {

        const setDeviceArray = (tempDevice) => {
            const updatedDevice = _.cloneDeep(tempDevice);
            var mutator = _.cloneDeep(deviceArray);
            const index = deviceArray.findIndex(storDev => storDev.device_id === device.device_id)
            mutator.splice(index, 1, updatedDevice)
            return mutator;
        }

        const flipSwitch = (powerState) => {
            var tempDevice = _.cloneDeep(device)
            const onVal = powerState === "True"  || powerState === true ? true : false;
            tempDevice.is_on = onVal;
            return tempDevice
        }

        TogglePower(device)
            .then(response => {
                return testResponse(response)
            })
            .then(response => {
                return response.json();
            })
            .then(json => {
                if(json.success){
                    const powerVal = device.is_on ? "False" : "True";
                    if (json.success === "device ID: "+device.device_id+" power is now "+powerVal) {
                        console.log("Power toggle sucess");
                        log(email, 3, device.device_name + " power toggled (ID: " + device.device_id + ")", device.device_id+"_power_toggled")
                        return powerVal;
                    }else {
                        throw new Error("Client and server out of sync");
                    }
                }else {
                    console.log(json)
                    throw new Error("Undefined toggle power error");
                }
            })
            .then(powerState => {
                return flipSwitch(powerState)
            })
            .then(tDevice =>{
                dispatch(updateDevice(tDevice));
                return setDeviceArray(tDevice)
            })
            .then(newArray =>{
                updateDeviceArray(newArray);
            })     
            .catch(error => {
                console.log(error.message);
                if (error.message === "Network request failed"){
                    log(email, 3, device.device_name + " power toggled (ID: " + device.device_id + ") - with network error", device.device_id + "_power_toggled");
                    const index = deviceArray.findIndex(storDev => storDev.device_id === device.device_id)
                    const updateDevice = flipSwitch(!deviceArray[index].is_on)
                    updateDeviceArray(setDeviceArray(updateDevice))
                } else if (error.message === "Client and server out of sync"){
                    log(email, 3, device.device_name + " power toggled (ID: " + device.device_id + ") - with sync error", device.device_id + "_power_toggled");
                    
                }
                   
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


    let deviceWidth = Dimensions.get('window').width
    // Create a list of devices using list.map. see: `https://react-native-elements.github.io/react-native-elements/docs/listitem.html`
    return (
        <View>
            {
                deviceArray.map((item, i) => (
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
                        <ChartData deviceId={item.device_id} />
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
                                    <ChartWrapper chartSize={30} deviceId={item.device_id} key={uuidv4({ random: seed() })} />
                                </Row>
                                
                            </Grid>
                        </View>
                        }
                        <Divider style={{ backgroundColor: 'black' }} />
                    </View>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    chartContainer: {
        justifyContent: "center"
    }
});

export default DeviceMenu;