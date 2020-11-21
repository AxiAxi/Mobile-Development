import React, { useState } from 'react';
import { View, ScrollView, StatusBar, Dimensions, StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { LineChart, PieChart } from 'react-native-svg-charts';

const genPoints = (fromP = -2 * Math.PI, toP = 2 * Math.PI, step = 0.01, operation = Math.sin) => {
    const xP = [];
    const yP = [];
    
    for (let p = fromP; p <= toP; p += step) {
        xP.push(fromP);
        yP.push(operation(p));
    };
    
    return { x: xP, y: yP };
};

const pieData = [25, 20, 55].map((value, index) => ({
    value,
    svg: {
        fill: ['#fce205', '#3cb371', '#0f52ba'][index]
    },
    key: `pie-${index}`
}));

export default function Drawing() {
    const [drawingIndex, setDrawingIndex] = useState(0);

    const setUpDrawing = (index) => {
        setDrawingIndex(index);
    };
    
    const lineChart = (
        <LineChart
            style={styles.chart}
            data={genPoints().y}
            svg={{ stroke: '#2288dc' }}
            showGrid={false}
            animate
            animationDuration={375}
        />
    );

    const pieChart = <PieChart style={styles.chart} data={pieData} />;
    
    const drawings = [{ title: 'y = sin(x)', component: lineChart }, { title: 'PIE', component: pieChart }];
    
    return (
        <ScrollView contentContainerStyle={styles.drawing}>
            <ButtonGroup
                onPress={setUpDrawing}
                selectedIndex={drawingIndex}
                buttons={drawings.map((drawing) => drawing.title)}
                containerStyle={styles.buttons}
            />
            <View style={styles.chartContainer}>
                {drawings[drawingIndex].component}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    drawing: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: StatusBar.currentHeight + 12.5
    },
    buttons: {
        width: Dimensions.get("screen").width * 0.875,
        marginBottom: 12.5
    },
    chartContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: Dimensions.get("screen").height * 0.5,
        marginBottom: 75,
        paddingHorizontal: 12.5,
        borderRadius: 7.5,
        backgroundColor: "#fff",
        color: "#000",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.25,
        shadowRadius: 1,
        elevation: 5
    },
    chart: {
        width: Dimensions.get("screen").width * 0.8,
        height: 225
    }
});
