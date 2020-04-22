import React, { useState } from 'react';
import { View, Dimensions, Text } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import dateFormat from 'dateformat';


const Chart = props => {
    const plotValues = props.plotData.map(element => {
        return element.data
    })
    const timeStamps = props.plotData.map(element => {
        return element.timeStamp
    })
    
    const data = {
        labels: [],
        datasets: [
            {
                data: plotValues
            }
        ]
    }

    const renderLineChart = (
        <View >
            <LineChart
                data={data}
                width={Dimensions.get("window").width - 15} // from react-native
                height={220}
                yAxisSuffix=" Ws"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 1, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 15
                    },
                    propsForDots: {
                        r: "2",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 5
                }}
            />
        </View>
    )

    return (
        <View>
            { renderLineChart }
        </View>
    )
}

export default Chart