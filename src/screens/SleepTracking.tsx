// SleepTracking.tsx
import React, {useContext, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import {BackgroundColorContext} from "../context/BackgroundColorContext.tsx";

const screenWidth = Dimensions.get('window').width;

const SleepTracking: React.FC = () => {

    const { backgroundColor } = useContext(BackgroundColorContext);

    const [isSleeping, setIsSleeping] = useState(false); // Uyku durumunu toggle etmek için

    const sleepTime = '07:24:34';

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                    <Text style={styles.statIcon}>🌙</Text>
                    <Text style={styles.statValue}>5h 30m</Text>
                    <Text style={styles.statLabel}>Sleep</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statIcon}>😴</Text>
                    <Text style={styles.statValue}>1h 10m</Text>
                    <Text style={styles.statLabel}>Deep</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statIcon}>⭐</Text>
                    <Text style={styles.statValue}>3h 30m</Text>
                    <Text style={styles.statLabel}>Quality</Text>
                </View>
            </View>

            <Text style={styles.bedtimeHeader}>Bedtime</Text>

            <View>
                <LineChart
                    data={{
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                        datasets: [
                            {
                                data: [200, 400, 300, 600, 248, 450],
                            },
                        ],
                    }}
                    width={screenWidth - 40} // Ekran genişliği eksi padding
                    height={220}
                    chartConfig={{
                        backgroundColor: '#253334',
                        backgroundGradientFrom: '#253334',
                        backgroundGradientTo: '#253334',
                        color: () => `#2B4A41`,
                    }}
                    bezier
                    style={styles.chart}
                />
            </View>

            <TouchableOpacity
                style={styles.sleepButton}
                onPress={() => setIsSleeping(!isSleeping)} // Uyku durumunu toggle et
            >
                <Text style={styles.sleepButtonText}>
                    {isSleeping ? `Stop sleep\n${sleepTime}` : 'Start sleep'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#253334',
        padding: 20,
        justifyContent: 'center',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    statBox: {
        backgroundColor: '#2B4A41',
        width: '30%',
        height: 120,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    statIcon: {
        fontSize: 24,
        color: '#fff',
    },
    statValue: {
        fontSize: 18,
        color: '#fff',
        marginVertical: 5,
    },
    statLabel: {
        fontSize: 14,
        color: '#ccc',
    },
    bedtimeHeader: {
        fontSize: 22,
        color: '#fff',
        fontFamily: 'AlegreyaBold',
        marginVertical: 20,
        textAlign: 'center',
    },
    chart: {
        borderRadius: 10,
        marginBottom: 30,
    },
    sleepButton: {
        backgroundColor: '#2B4A41',
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
    },
    sleepButtonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default SleepTracking;
