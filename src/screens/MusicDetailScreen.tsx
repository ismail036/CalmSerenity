// MusicDetailScreen.tsx

import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import Sound from 'react-native-sound';
import Slider from '@react-native-community/slider';
import axios from 'axios';

// Enable playback in silence mode (iOS)
// Sound.setCategory('Playback');

// Define the Song interface
interface Song {
    id: string;
    title: string;
    imageUrl: string;
    link: string;
    artist?: string; // Optional artist field
}

// Define route prop type
type RootStackParamList = {
    MusicDetail: { song: Song };
};

type MusicDetailScreenRouteProp = RouteProp<RootStackParamList, 'MusicDetail'>;

const MusicDetailScreen: React.FC<{ route: MusicDetailScreenRouteProp }> = ({ route }) => {
    const { song } = route.params; // Access the passed song data
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioLink, setAudioLink] = useState<string | null>(null);
    const [soundInstance, setSoundInstance] = useState<Sound | null>(null);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch audio link from song page
    useEffect(() => {
        fetchAudioLink(song.link);
        return () => {
            if (soundInstance) {
                soundInstance.release();
            }
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [song.link, soundInstance]);

    const fetchAudioLink = async (pageLink: string) => {
        try {
            const response = await axios.get(pageLink);
            const html = response.data;
            const mp3LinkMatch = html.match(/https?:\/\/[^\s"']+\.mp3/);
            if (mp3LinkMatch && mp3LinkMatch[0]) {
                setAudioLink(mp3LinkMatch[0]);
                setIsLoading(false);
            } else {
                Alert.alert('Error', 'Audio link not found.');
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error fetching audio link:', error);
            Alert.alert('Error', 'Failed to fetch audio link.');
            setIsLoading(false);
        }
    };

    const togglePlayback = () => {
        if (!audioLink) {
            Alert.alert('Error', 'No audio link available for playback.');
            return;
        }

        if (isPlaying) {
            soundInstance?.pause();
            setIsPlaying(false);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        } else {
            if (soundInstance) {
                soundInstance.play(onPlaybackEnd);
                setIsPlaying(true);
                startProgressUpdater();
            } else {
                const sound = new Sound(audioLink, (error) => {
                    if (error) {
                        Alert.alert('Error', 'Failed to load the sound.');
                        setIsPlaying(false);
                        return;
                    }
                    setDuration(sound.getDuration());
                    setSoundInstance(sound);
                    setIsPlaying(true);
                    sound.play(onPlaybackEnd);
                    startProgressUpdater();
                });
            }
        }
    };

    const onPlaybackEnd = (success: boolean) => {
        if (success) {
            setCurrentTime(0);
            setIsPlaying(false);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        } else {
            Alert.alert('Error', 'Playback failed due to audio decoding errors.');
            setIsPlaying(false);
        }
    };

    const startProgressUpdater = () => {
        if (soundInstance) {
            intervalRef.current = setInterval(() => {
                soundInstance.getCurrentTime((seconds) => {
                    setCurrentTime(seconds);
                });
            }, 500);
        }
    };

    const onSliderValueChange = (value: number) => {
        if (soundInstance) {
            soundInstance.setCurrentTime(value);
            setCurrentTime(value);
        }
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1E90FF" />
                <Text style={styles.loadingText}>Loading song...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: song.imageUrl }} style={styles.songImage} />
            <Text style={styles.songTitle}>{song.title}</Text>
            <Text style={styles.songArtist}>{song.artist || 'Unknown Artist'}</Text>

            <Slider
                value={currentTime}
                onValueChange={onSliderValueChange}
                maximumValue={duration}
                minimumValue={0}
                minimumTrackTintColor="#1E90FF"
                maximumTrackTintColor="#FFFFFF"
                thumbTintColor="#1E90FF"
                style={styles.progressBar}
            />
            <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>

            <TouchableOpacity onPress={togglePlayback} style={styles.playPauseButton}>
                <Text style={styles.playPauseText}>{isPlaying ? 'Pause' : 'Play'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const paddedSecs = secs < 10 ? `0${secs}` : secs;
    return `${mins}:${paddedSecs}`;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        color: '#FFFFFF',
        marginTop: 10,
    },
    songImage: {
        width: 250,
        height: 250,
        borderRadius: 10,
        marginBottom: 30,
    },
    songTitle: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    songArtist: {
        fontSize: 18,
        color: '#BBBBBB',
        textAlign: 'center',
        marginBottom: 30,
    },
    progressBar: {
        width: '100%',
        height: 40,
        marginVertical: 10,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
    },
    timeText: {
        color: '#BBBBBB',
        fontSize: 14,
    },
    playPauseButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#1E90FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    playPauseText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default MusicDetailScreen;
