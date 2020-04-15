import React, { useState, useRef, createRef, useEffect, useCallback } from 'react';
import { View, ScrollView, ActivityIndicator, Text } from 'react-native';
import { ListItem, ButtonGroup } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import dateFormat from 'dateformat';
import * as _ from 'lodash/fp';

import { seed } from "../../../utils/uuidSeed";
import Fetching from '../Fetching';
import GetLogStream from '../../logic/GetLogStream';
import { testResponse } from '../../logic/fetchFunc';


const LogViewer = props => {
    const [logEntries, setLogEntries] = useState(null);
    const [entryLoading, setEntryLoading] = useState([])
    const [expandedLogEntries, setExpandedLogEntries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [buttonIndex, setButtonIndex] = useState();
    

    const devices = useSelector(state => state.deviceStore.devices);

    // fetch array of entries
    // list: entries.map(entry.summary(name) + entry.updated(timestamp) + entry.id(path to entry details))

    // click next page => response.links.map(link.relation === next + update array of entries from link.uri)

    const finishedLoading = () => {
        setIsLoading(false);
    }

    const updateLogEntries = response => {
        const entries = response.entries;
        setLogEntries(response.entries)
        const loadingArr = Array(entries.length).fill(false)
        setEntryLoading(loadingArr);
        const expandedArr = Array(entries.length).fill(null)
        setExpandedLogEntries(expandedArr);
    }

    
    const humanName = string => {
        const toggle_power_regex = /^(\d+)_power_toggled$/;

        if (toggle_power_regex.test(string)) {
            const deviceId = string.match(/\d+/)[0];
            const device = devices.find(device => device.device_id == deviceId)
            return device.device_name+" power toggled";
        } else {
            return string;
        }
    }


    const toggleEntryLoading = index => {
        var mutator = _.cloneDeep(entryLoading);
        mutator.splice(index, 1,mutator[index] ? false : true);
        setEntryLoading(mutator);
    }

    const fetchLogEntryData = (id, index) => {
        var tempLog = _.cloneDeep(expandedLogEntries);
        toggleEntryLoading(index);

        
        GetLogStream(id)
        .then(response => testResponse(response))
        .then(response => {
            return response.json()
        })
        .then(json => {
            tempLog.splice(index, 1, json)
            setExpandedLogEntries(tempLog)
            toggleEntryLoading(index)
        })
        .catch(error => {
            console.log(error.message)
        })
        

        
    }

 

    return (
        <View>
            <ScrollView>
                {!logEntries && <Fetching fetchFunc={GetLogStream} fetchWhat={"logs"} ready={() => finishedLoading} updateParentState={updateLogEntries}/>}
                {!!logEntries && 
                logEntries.map((log, i) => {
                
                    const name = humanName(log.summary);
                    return (
                        <View>
                            <ListItem
                                key={uuidv4({ random: seed() })}
                                title={name}
                                rightSubtitle={dateFormat(log.updated, "h:MM:ss TT, mmmm dS, yyyy")}
                                rightElement={
                                    <View>
                                        <ActivityIndicator 
                                            key={uuidv4({ random: seed() })}
                                            animating={entryLoading[i]}
                                            size="small"
                                        />
                                    </View>
                                }
                                bottomDivider
                                chevron
                                onPress={() => fetchLogEntryData(log.id, i)}
                            />
                            {
                                !entryLoading[i] &&
                                !!expandedLogEntries[i] &&
                                <View>
                                    <Text key={uuidv4({ random: seed() })}>
                                        Email: {expandedLogEntries[i].content.data.email}
                                    </Text>
                                    <Text key={uuidv4({ random: seed() })}>
                                        Device name: {expandedLogEntries[i].content.data.device_info.device_name}
                                    </Text>
                                    <Text key={uuidv4({ random: seed() })}>
                                        Device platform: {expandedLogEntries[i].content.data.device_info.device_platform}
                                    </Text>
                                    <Text key={uuidv4({ random: seed() })}>
                                        Event description: {expandedLogEntries[i].content.data.event_description}
                                    </Text>
                                </View>
                            }
                        </View>
                    );
                })}
                <ListItem
                    key={"Next page"}
                    title={"Next page"}
                    
                />
            </ScrollView>
        </View>
    )
}

export default LogViewer;