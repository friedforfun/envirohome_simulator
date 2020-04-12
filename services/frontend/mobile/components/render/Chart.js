import React, { useState } from 'react';
import { View, Dimensions, Text } from 'react-native';
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;
const testData = [{ name: 'value 1', av: 20, bv: 40 }, { name: 'value 2', av: 25, bv: 32 }, { name: 'value 3', av: 15, bv: 56 }]
const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43],
            strokeWidth: 2 // optional
        }
    ],
    legend: ["Rainy Days", "Sunny Days", "Snowy Days"] // optional
};


const renderLineChart = (
    <View>
        <Text>Bezier Line Chart</Text>
        <LineChart
            data={{
                labels: ["January", "February", "March", "April", "May", "June"],
                datasets: [
                    {
                        data: [
                            "20",
                            "123",
                            "42",
                            "64",
                            "100",
                            "80"
                        ]
                    }
                ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                }
            }}
            bezier
            style={{
                marginVertical: 8,
                borderRadius: 16
            }}
        />
    </View>
)

const Chart = props => {
    return (
        <View>
            { renderLineChart }
        </View>
    )
}

export default Chart