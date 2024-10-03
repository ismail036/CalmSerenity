import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';

const { width } = Dimensions.get('window');

function HomeScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.welcomeText}>Welcome!</Text>
            <Text style={styles.subText}>Choose how you want to relax today</Text>

            <View style={styles.recommendationCard}>
                <Text style={styles.recommendationTitle}>Recommendations:</Text>
                <Text style={styles.recommendationText}>We have prepared a recommendation for you today.</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Listen now</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.categoryTitle}>Music:</Text>
            <View style={styles.buttonContainer}>
                {['Calm', 'Very calm', 'Moderate', 'Energetic', 'Growing'].map((item, index) => (
                    <TouchableOpacity key={index} style={styles.optionButton}>
                        <Text style={styles.optionButtonText}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.categoryTitle}>Sound:</Text>
            <View style={styles.buttonContainer}>
                {['Ocean', 'Rain', 'Forest', 'Birds', 'City', 'Wind', 'Woodland', 'Storm', 'Traffic', 'Rural', 'Night', 'Room tones'].map((item, index) => (
                    <TouchableOpacity key={index} style={styles.optionButton}>
                        <Text style={styles.optionButtonText}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#253334',
    },
    welcomeText: {
        fontSize: 32,
        color: 'white',
        fontWeight: 'bold',
    },
    subText: {
        fontSize: 18,
        color: 'gray',
        marginVertical: 10,
    },
    recommendationCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        marginVertical: 20,
    },
    recommendationTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    recommendationText: {
        fontSize: 16,
        marginBottom: 10,
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
    },
    recommendationImage: {
        width: 80,
        height: 80,
        position: 'absolute',
        right: 20,
        bottom: 20,
    },
    categoryTitle: {
        fontSize: 20,
        color: 'white',
        marginVertical: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    optionButton: {
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        padding: 10,
        marginVertical: 5,
        width: (width - 60) / 3, // Ekranı üçe bölmek için ayarlanmış genişlik
        alignItems: 'center',
    },
    optionButtonText: {
        fontSize: 16,
    },
});

export default HomeScreen;
