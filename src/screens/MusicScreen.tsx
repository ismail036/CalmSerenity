import React, { useEffect, useState, useContext } from 'react';
import {View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity} from 'react-native';
import axios from 'axios';
import { BackgroundColorContext } from '../context/BackgroundColorContext';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {Song} from "../types/Song.ts";
import {data} from "cheerio/dist/esm/api/attributes";

// Define the route prop type
type RootStackParamList = {
    Music: { label: string };
};

type MusicScreenRouteProp = RouteProp<RootStackParamList, 'Music'>;



// Utility function to decode basic HTML entities
const decodeHtmlEntities = (text: string): string => {
    return text.replace(/&#x27;/g, "'")  // Handle apostrophes
        .replace(/&amp;/g, '&')    // Handle & symbol
        .replace(/&lt;/g, '<')     // Handle <
        .replace(/&gt;/g, '>')     // Handle >
        .replace(/&quot;/g, '"');  // Handle quotes
};

const MusicScreen: React.FC<{ route: MusicScreenRouteProp }> = ({ route }) => {
    const { backgroundColor } = useContext(BackgroundColorContext);
    const [songData, setSongData] = useState<Song[]>([]);
    const [loading, setLoading] = useState(true);

    // Access the label passed from HomeScreen and convert it to lowercase
    const { label } = route.params;
    const lowerCaseTitle = label.toLowerCase();

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                console.log(`https://uppbeat.io/browse/music/${lowerCaseTitle}`);

                // Make the network request
                const { data: html } = await axios.get(`https://uppbeat.io/browse/music/${lowerCaseTitle}`);
                let songs: Song[] = [];


                // Regex patterns to extract song data
                const titleRegex = /<div class="ub-track-info-title-left" data-testid="track-name">(.*?)<\/div>/g;
                const imgRegex = /<img.*?class="artist-avatar".*?src="(.*?)"/g;
                const linkRegex = /<a class="desktop" href="(.*?)">/g;

                let titleMatch;
                let imgMatch;
                let linkMatch;
                let id = 0;

                // Iterate over matches to collect titles, image URLs, and links
                while ((titleMatch = titleRegex.exec(html)) !== null && (imgMatch = imgRegex.exec(html)) !== null && (linkMatch = linkRegex.exec(html)) !== null) {
                    const title = decodeHtmlEntities(titleMatch[1].trim());  // Decode HTML entities
                    const imageUrl = imgMatch[1];  // Extract image URL
                    const link = `https://uppbeat.io${linkMatch[1]}`;  // Construct full link

                    songs.push({ id: id.toString(), title, imageUrl, link });
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
                // @ts-ignore
                navigation.navigate('MusicDetail', { song: item }); // Navigate to the detail screen with song data
            }}
        >
            <View style={styles.songItem}>
                <Image source={{ uri: item.imageUrl }} style={styles.songImage} />
                <View style={styles.songDetails}>
                    <Text style={styles.songTitle}>{item.title}</Text>
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
        fontFamily: 'AlegreyaBold',
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        color: 'gray',
        marginBottom: 20,
        fontFamily: 'AlegreyaSansRegular',
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
        fontFamily: 'AlegreyaSansRegular',
    },
    songLink: {
        fontSize: 16,
        color: '#1E90FF',
        marginTop: 5,
        fontFamily: 'AlegreyaSansRegular',
    },
});

export default MusicScreen;

