import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, AppState, AppStateStatus } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackgroundColorContext } from "../context/BackgroundColorContext.tsx";

const screenWidth = Dimensions.get('window').width;

const SleepTracking: React.FC = () => {
    const { backgroundColor } = useContext(BackgroundColorContext);
    const [isSleeping, setIsSleeping] = useState(false);
    const [sleepStart, setSleepStart] = useState<number | null>(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [sleepData, setSleepData] = useState<number[]>([]);
    const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

    useEffect(() => {
        const loadSleepData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('sleepData');
                const storedStartTime = await AsyncStorage.getItem('sleepStart');

                if (storedData) {
                    const parsedData = JSON.parse(storedData).filter((d: number) => !isNaN(d) && isFinite(d));
                    setSleepData(parsedData);
                }

                if (storedStartTime) {
                    const parsedStartTime = JSON.parse(storedStartTime);
                    const now = Date.now();
                    setSleepStart(parsedStartTime);
                    setIsSleeping(true);
                    setElapsedTime(Math.floor((now - parsedStartTime) / 1000)); // Zamanı hesapla
                }
            } catch (error) {
                console.error('Error loading sleep data or start time', error);
            }
        };

        loadSleepData();
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        if (isSleeping && sleepStart !== null) {
            timer = setInterval(() => {
                const now = Date.now();
                setElapsedTime(Math.floor((now - sleepStart) / 1000)); // Geçen süreyi günceller
            }, 1000);
        }
        return () => {
            if (timer !== null) {
                clearInterval(timer);
            }
        };
    }, [isSleeping, sleepStart]);

    useEffect(() => {
        const handleAppStateChange = (nextAppState: AppStateStatus) => {
            if (appState.match(/inactive|background/) && nextAppState === 'active') {
                const now = Date.now();
                if (isSleeping && sleepStart !== null) {
                    setElapsedTime(Math.floor((now - sleepStart) / 1000)); // Uygulama geri döndüğünde süreyi günceller
                }
            }
            setAppState(nextAppState); // AppStateStatus türünde bir değer atanıyor
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            subscription.remove(); // Artık removeEventListener yerine subscription.remove() kullanılır
        };
    }, [appState, isSleeping, sleepStart]);

    const handleStartSleep = async () => {
        const startTime = Date.now();
        setIsSleeping(true);
        setSleepStart(startTime);

        await AsyncStorage.setItem('sleepStart', JSON.stringify(startTime));
    };

    const handleStopSleep = async () => {
        setIsSleeping(false);
        if (sleepStart !== null) {
            const now = Date.now();
            const duration = Math.floor((now - sleepStart) / 1000);

            const updatedSleepData = [...sleepData, duration].filter((d) => !isNaN(d) && isFinite(d));
            setSleepData(updatedSleepData);

            await AsyncStorage.setItem('sleepData', JSON.stringify(updatedSleepData));

            setSleepStart(null);
            setElapsedTime(0);
            await AsyncStorage.removeItem('sleepStart'); // Sleep start verisini durdurduktan sonra temizler
        }
    };

    const formatElapsedTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

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
                        labels: ['Sleep 1', 'Sleep 2', 'Sleep 3'],
                        datasets: [
                            {
                                data: sleepData.length > 0 ? sleepData : [0],
                            },
                        ],
                    }}
                    width={screenWidth - 40}
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
                onPress={isSleeping ? handleStopSleep : handleStartSleep}
            >
                <Text style={styles.sleepButtonText}>
                    {isSleeping
                        ? `Stop sleep\n${formatElapsedTime(elapsedTime)}`
                        : 'Start sleep'}
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
