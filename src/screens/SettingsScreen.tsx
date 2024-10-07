import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

const SettingsScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Tools</Text>
                <Text style={styles.subHeaderText}>Tools for better relaxation</Text>
            </View>

            <View style={styles.toolsContainer}>
                <TouchableOpacity style={styles.imageButton}>
                    <Image
                        source={require('../assets/images/SleepTracking.png')}
                        style={styles.toolImage}
                        resizeMode="contain" // Ensures image fits within the button
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.imageButton}>
                    <Image
                        source={require('../assets/images/BackgroundColor.png')}
                        style={styles.toolImage}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.imageButton}>
                    <Image
                        source={require('../assets/images/PersonalDiary.png')}
                        style={styles.toolImage}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
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
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    headerText: {
        fontSize: 28,
        color: '#fff',
        fontFamily: 'AlegreyaBold',
    },
    subHeaderText: {
        fontSize: 16,
        color: '#ccc',
    },
    toolsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageButton: {
        width: '45%', // Control width of the touchable area
        aspectRatio: 1, // Ensure it is proportional (square or matching image aspect ratio)
        marginVertical: 0,
        borderRadius: 12, // Optional: Add rounded corners if desired
        overflow: 'hidden', // Ensures the image stays within the rounded corners
    },
    toolImage: {
        width: '100%',
        height: '100%',
    },
});

export default SettingsScreen;
