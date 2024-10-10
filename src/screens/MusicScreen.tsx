import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { BackgroundColorContext } from '../context/BackgroundColorContext';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { Song } from "../types/Song.ts";

// Define the route prop type
type RootStackParamList = {
    Music: { label: string };
};

type MusicScreenRouteProp = RouteProp<RootStackParamList, 'Music'>;

// Utility function to decode basic HTML entities
const decodeHtmlEntities = (text: string): string => {
    return text.replace(/&#x27;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"');
};

const MusicScreen: React.FC<{ route: MusicScreenRouteProp }> = ({ route }) => {
    const { backgroundColor } = useContext(BackgroundColorContext);
    const [songData, setSongData] = useState<Song[]>([]);
    const [loading, setLoading] = useState(true);

    const { label } = route.params;
    const lowerCaseTitle = label.toLowerCase();

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const { data: html } = await axios.get(`https://uppbeat.io/browse/music/${lowerCaseTitle}`);
                let songs: Song[] = [];

                // Regex patterns to extract song data
                const titleRegex = /<div class="ub-track-info-title-left" data-testid="track-name">(.*?)<\/div>/g;
                const imgRegex = /<img.*?class="artist-avatar".*?src="(.*?)"/g;
                const linkRegex = /<a class="desktop" href="(.*?)">/g;
                const artistRegex = /<a data-testid="artist-name".*?>.*?<span class="ub-btn-label">(.*?)<\/span><\/a>/g;  // Updated artist extraction

                let titleMatch;
                let imgMatch;
                let linkMatch;
                let artistMatch;
                let id = 0;

                // Iterate over matches to collect titles, image URLs, links, and artists
                while ((titleMatch = titleRegex.exec(html)) !== null
                && (imgMatch = imgRegex.exec(html)) !== null
                && (linkMatch = linkRegex.exec(html)) !== null
                && (artistMatch = artistRegex.exec(html)) !== null) {

                    const title = decodeHtmlEntities(titleMatch[1].trim());
                    const imageUrl = imgMatch[1];
                    const link = `https://uppbeat.io${linkMatch[1]}`;
                    const artist = decodeHtmlEntities(artistMatch[1].trim());

                    songs.push({ id: id.toString(), title, imageUrl, link, artist });
                    id++;
                }

                // Remove duplicates based on song title
                const uniqueSongs = songs.filter(
                    (song, index, self) =>
                        index === self.findIndex((t) => t.title === song.title)
                );

                setSongData(uniqueSongs);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching song data:', error);
                setLoading(false);
            }
        };

        fetchSongs();
    }, [lowerCaseTitle]);

    const navigation = useNavigation();

    const renderSongItem = ({ item }: { item: Song }) => (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('MusicDetail', { song: item });
            }}
        >
            <View style={styles.songItem}>
                <Image source={{ uri: item.imageUrl }} style={styles.songImage} />
                <View style={styles.songDetails}>
                    <Text style={styles.songTitle}>{item.title}</Text>
                    <Text style={styles.songArtist}>{item.artist || 'Unknown Artist'}</Text> 
                    <Text style={styles.songLink}>Listen</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Text style={styles.title}>Music</Text>
            <Text style={styles.subtitle}>{label}</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#ffffff" />
            ) : (
                <FlatList
                    data={songData}
                    renderItem={renderSongItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.songList}
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
    songList: {
        paddingBottom: 20,
    },
    songItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    songImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginRight: 15,
    },
    songDetails: {
        flex: 1,
    },
    songTitle: {
        fontSize: 18,
        color: 'white',
    },
    songArtist: {
        fontSize: 16,
        color: '#BBBBBB',
        marginTop: 5,
    },
    songLink: {
        fontSize: 16,
        color: '#1E90FF',
        marginTop: 5,
    },
});

export default MusicScreen;
