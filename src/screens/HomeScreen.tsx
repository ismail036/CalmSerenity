import React, { useContext } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { BackgroundColorContext } from "../context/BackgroundColorContext.tsx";
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const { width } = Dimensions.get('window');

function HomeScreen() {
    const { backgroundColor } = useContext(BackgroundColorContext);
    const navigation = useNavigation(); // Access navigation object

    // Handler function to navigate to the MusicScreen with the button label
    const handleMusicPress = (label: string) => {
      navigation.navigate('Music', {label});
    };

    // Handler function to navigate to the SoundScreen with the button label
    const handleSoundPress = (label: string) => {
      navigation.navigate('Sound', {label});
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor }]}>
            <Text style={[styles.text, styles.welcomeText]}>Welcome!</Text>
            <Text style={[styles.text, styles.subText]}>Choose how you want to relax today</Text>

            <View style={styles.recommendationCard}>
                <Text style={[styles.text, styles.recommendationTitle]}>Recommendations:</Text>
                <Text style={[styles.text, styles.recommendationText]}>We have prepared a recommendation for you today.</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={[styles.text, styles.buttonText]}>Listen now</Text>
                </TouchableOpacity>
                <Image
                    source={require('../assets/images/recommendationsImage.png')}
                    style={styles.recommendationImage}
                />
            </View>

            <Text style={[styles.text, styles.categoryTitle]}>Music:</Text>
            <View style={styles.buttonContainer}>
                {['Calm', 'Inspiring', 'Happy', 'Dramatic', 'Energizing' , 'Sad' , 'Dark'].map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.optionButton}
                        onPress={() => handleMusicPress(item)} // Navigate to MusicScreen with label
                    >
                        <Text style={[styles.text, styles.optionButtonText]}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={[styles.text, styles.categoryTitle]}>Sound:</Text>
            <View style={styles.buttonContainer}>
                {['Ocean', 'Rain', 'Forest', 'Birds', 'City', 'Wind', 'Woodland', 'Storm', 'Traffic', 'Rural', 'Night', 'Room tones' , 'Industrial' , 'Crowd Walla' , 'Desert'].map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.optionButton}
                        onPress={() => handleSoundPress(item)} // Navigate to SoundScreen with label
                    >
                        <Text style={[styles.text, styles.optionButtonText]}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.spacer} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#253334',
    },
    text: {
        fontFamily: 'AlegreyaSansRegular', // Tüm metinlerde bu fontFamily kullanılacak
    },
    welcomeText: {
        fontSize: 32,
        color: 'white',
        fontFamily: 'AlegreyaBold', // Bu stil ayrı olarak bold font kullanıyor
    },
    subText: {
        fontSize: 18,
        color: 'gray',
        marginVertical: 10,
        fontFamily: 'AlegreyaSansBold' // Bold kullanılacaksa ayrıca belirtiyoruz
    },
    recommendationCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        marginVertical: 20,
        position: 'relative', // For absolute positioning of the image
    },
    recommendationTitle: {
        fontSize: 22,
        marginBottom: 10,
        fontFamily: 'AlegreyaRegular',
    },
    recommendationText: {
        fontSize: 16,
        marginBottom: 10,
        width: 190,
        fontFamily: 'AlegreyaSansRegular',
    },
    button: {
        backgroundColor: '#1abc9c',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'AlegreyaSansRegular',
    },
    recommendationImage: {
        width: '70%',
        height: '70%',
        position: 'absolute',
        right: -20,
        bottom: 20,
        resizeMode: 'contain',
    },
    categoryTitle: {
        fontSize: 20,
        color: 'white',
        marginVertical: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    optionButton: {
        marginHorizontal: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        paddingVertical: 13,
        marginVertical: 5,
        width: ((width - 60) / 3) - 5, // Ekranı üçe bölmek için ayarlanmış genişlik
        alignItems: 'center',
    },
    optionButtonText: {
        fontSize: 16,
    },
    spacer: {
        height: 50,
        width: '100%',
    },
});

export default HomeScreen;
