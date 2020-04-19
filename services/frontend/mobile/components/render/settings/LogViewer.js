import React, { useState, useRef, createRef, useEffect, useCallback } from 'react';
import { View, ScrollView, ActivityIndicator, Text, Button } from 'react-native';
import { ListItem, ButtonGroup } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import dateFormat from 'dateformat';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
    const [nextPageLink, setNextPageLink] = useState(null);
    const [clickNextPage, setClickNextPage] = useState(false);

    

    const devices = useSelector(state => state.deviceStore.devices);

    // fetch array of entries
    // list: entries.map(entry.summary(name) + entry.updated(timestamp) + entry.id(path to entry details))

    // click next page => response.links.map(link.relation === next + update array of entries from link.uri)

    const finishedLoading = () => {
        setIsLoading(false);
    }

    const updateLogEntries = response => {
        const entries = response.entries;
        const links = response.links;
        const next = links.find(link => link.relation === "next")
        if (next != undefined) {
            setNextPageLink(next.uri)
        } else {
            setNextPageLink(null)
        }
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




    const fetchLogEntryData = (id, index) => {

        const toggleEntryLoading = () => {
            console.log("Toggle")
            var mutator = _.cloneDeep(entryLoading);
            mutator.splice(index, 1, mutator[index] ? false : true);
            setEntryLoading(mutator);
        }

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
                {!logEntries && isLoading &&
                <Fetching 
                    fetchFunc={GetLogStream} 
                    fetchWhat={"logs"} 
                    ready={() => finishedLoading} 
                    updateParentState={updateLogEntries}
                />}
                {!!logEntries && 
                logEntries.map((log, i) => {
                
                    const name = humanName(log.summary);
                    return (
                        <View key={i}>
                            <ListItem
                                key={log.title+i}
                                title={name}
                                rightSubtitle={dateFormat(log.updated, "h:MM:ss TT, mmmm dS, yyyy")}
                                rightElement={
                                    <View key={i+log.id}>
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
                                <View key={uuidv4({ random: seed() })+1}>
                                    <Text key={uuidv4({ random: seed() })}>
                                        Email: {expandedLogEntries[i].content.data.email}
                                    </Text>
                                    <Text key={uuidv4({ random: seed() })+2}>
                                        Device name: {expandedLogEntries[i].content.data.device_info.device_name}
                                    </Text>
                                    <Text key={uuidv4({ random: seed() })+3}>
                                        Device platform: {expandedLogEntries[i].content.data.device_info.device_platform}
                                    </Text>
                                    <Text key={uuidv4({ random: seed() })+4}>
                                        Event description: {expandedLogEntries[i].content.data.event_description}
                                    </Text>
                                </View>
                            }
                        </View>
                    );
                })}
                <ListItem
                    key={"Next page"}
                    leftElement={
                        <TouchableOpacity key={100} onPress={() => {
                            setLogEntries(null)
                            setIsLoading(true)
                        }}>
                            <Button key={"Front button"} title="Return to front" />
                        </TouchableOpacity>
                    }
                    rightElement={
                        <View key={"really annoying missing key bug"}>

                            {!!nextPageLink && 
                            <TouchableOpacity key={"another unique key"} onPress={() => {
                                setClickNextPage(true)
                                setIsLoading(true)
                                }}>
                                <Button key={"I guess everything needs a unique key"} title="Next Page" />
                                
                            </TouchableOpacity>}
                            {nextPageLink === null && 

                            <Button key={"last one..."} title="Next Page" disabled />
                            
                            }
                        </View>
                    }
                    
                />
                {clickNextPage && !!nextPageLink && isLoading &&
                <Fetching 
                    fetchFunc={() => GetLogStream(nextPageLink)} 
                    fetchWhat={"logs"} 
                    ready={() => finishedLoading} 
                    updateParentState={updateLogEntries} 
                />}
            </ScrollView>
        </View>
    )
}

export default LogViewer;