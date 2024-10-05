import React, { useState, useEffect } from 'react';
import {View, Text, ScrollView, StyleSheet, Image, TouchableOpacity} from 'react-native';

const MeditationScreen: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState<number>(2700); // Başlangıç süresi 45 dakika (saniye cinsinden)
    const [isRunning, setIsRunning] = useState<boolean>(false); // Geri sayımın çalışıp çalışmadığını kontrol eder

    useEffect(() => {
        let timer: any;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else {
            clearInterval(timer);
        }

        return () => clearInterval(timer); // Temizlik işlemi için clearInterval
    }, [isRunning, timeLeft]);

    const handleStartPause = () => {
        setIsRunning((prev) => !prev); // Butona tıklayınca durumu değiştir (başlat/duraklat)
    };

    const handleReset = () => {
        setIsRunning(false);
        setTimeLeft(2700); // Geri sayımı sıfırla ve başlangıç süresine getir
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <View style={styles.fullScreenView}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={[styles.text, styles.mainText]}>Meditation</Text>
                <Text style={[styles.text, styles.subText]}>Turn on a timer and meditate</Text>

                <Image
                    source={require('../assets/images/meditation.png')}
                    style={styles.meditationImage}
                />

                <Text style={styles.timerText}>{formatTime(timeLeft)}</Text> 

                <TouchableOpacity style={styles.button} onPress={handleStartPause}>
                    <Text style={styles.buttonText}>{isRunning ? 'Pause' : 'Start Now'}</Text>
                </TouchableOpacity>

                {isRunning && (
                    <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                        <Text style={styles.resetButtonText}>Reset</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    fullScreenView: {
        flex: 1,
        backgroundColor: '#253334',
    },
    container: {
        padding: 20,
        backgroundColor: '#253334',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
    },
    text: {
        fontFamily: 'AlegreyaSansRegular', // Tüm metinlerde bu fontFamily kullanılacak
    },
    mainText: {
        fontSize: 32,
        color: 'white',
        fontFamily: 'AlegreyaBold', // Bu stil ayrı olarak bold font kullanıyor
    },
    subText: {
        fontSize: 18,
        color: 'gray',
        marginVertical: 1,
    },
    meditationImage: {
        width: '50%',
        height: '50%',
        resizeMode: 'contain',
    },
    button: {
        backgroundColor: '#315C58',
        paddingVertical: 15,
        paddingHorizontal: 38,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    timerText: {
        color: 'white',
        fontSize: 48,
        marginVertical: 20,
    },
    resetButton: {
        backgroundColor: '#FF5C5C',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 15,
    },
    resetButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default MeditationScreen;
