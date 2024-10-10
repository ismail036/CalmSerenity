import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { BackgroundColorContext } from '../context/BackgroundColorContext';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { Sound } from '../types/Sound';

type RootStackParamList = {
    Music: { label: string };
};

type MusicScreenRouteProp = RouteProp<RootStackParamList, 'Music'>;

const decodeHtmlEntities = (text: string): string => {
    return text.replace(/&#x27;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"');
};

const SoundScreen: React.FC<{ route: MusicScreenRouteProp }> = ({ route }) => {
    const { backgroundColor } = useContext(BackgroundColorContext);
    const [soundData, setSoundData] = useState<Sound[]>([]);
    const [loading, setLoading] = useState(true);
    const { label } = route.params;
    const lowerCaseTitle = label.toLowerCase();

    useEffect(() => {
        const fetchSounds = async () => {
            try {
                const { data: html } = await axios.get(`https://uppbeat.io/browse/sfx/${lowerCaseTitle}`);
                let sounds: Sound[] = [];

                const titleRegex = /<div class="ub-track-info-title-left" data-testid="track-name">(.*?)<\/div>/g;
                const linkRegex = /<a .*?href="(.*?)">.*?<\/a>/g;
                const artistRegex = /<span class="ub-track-info-subtitle">(.*?)<\/span>/g;

                let titleMatch, linkMatch, artistMatch;
                let id = 0;

                while ((titleMatch = titleRegex.exec(html)) !== null
                && (linkMatch = linkRegex.exec(html)) !== null
                && (artistMatch = artistRegex.exec(html)) !== null) {
                    const link = linkMatch[1].trim();
                    if (link.includes('/sfx/')) {
                        const title = decodeHtmlEntities(titleMatch[1].trim());
                        const artist = decodeHtmlEntities(artistMatch[1].trim());  // Extract artist name
                        const fullLink = `https://uppbeat.io${link}`;
                        sounds.push({ id: id.toString(), title, link: fullLink, artist });
                        id++;
                    }
                }

                const uniqueSounds = sounds.filter(
                    (sound, index, self) => index === self.findIndex((t) => t.title === sound.title)
                );

                setSoundData(uniqueSounds);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchSounds();
    }, [lowerCaseTitle]);

    const navigation = useNavigation();

    const renderSoundItem = ({ item }: { item: Sound }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('SoundDetail', { song: item })} // Pass artist in song object
        >
            <View style={styles.soundItem}>
                <Image source={require('../assets/icons/soundIcon.jpg')} style={styles.soundImage} />
                <View style={styles.soundDetails}>
                    <Text style={styles.soundTitle}>{item.title}</Text>
                    <Text style={styles.soundArtist}>{item.artist || 'Unknown Artist'}</Text>
                    <Text style={styles.soundLink}>Listen</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Text style={styles.title}>Sounds</Text>
            <Text style={styles.subtitle}>{label}</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#ffffff" />
            ) : (
                <FlatList
                    data={soundData}
                    renderItem={renderSoundItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.soundList}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: '#253334',
    },
    title: {
        textAlign: 'center',
        fontSize: 28,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        color: 'gray',
        marginBottom: 20,
    },
    soundList: {
        paddingBottom: 20,
    },
    soundItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    soundImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginRight: 15,
    },
    soundDetails: {
        flex: 1,
    },
    soundTitle: {
        fontSize: 18,
        color: 'white',
    },
    soundArtist: {
        fontSize: 16,
        color: '#BBBBBB',
        marginTop: 5,
    },
    soundLink: {
        fontSize: 16,
        color: '#1E90FF',
        marginTop: 5,
    },
});

export default SoundScreen;
