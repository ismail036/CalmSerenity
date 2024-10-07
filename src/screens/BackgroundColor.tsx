import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BackgroundColorContext } from '../context/BackgroundColorContext'; // Import global color context

// Color options to choose from
const colors = [
    { name: 'Anthracite grey', color: '#253334' },
    { name: 'Poisonous green', color: '#3E8469' },
    { name: 'Moderate bluish green', color: '#2B5B54' },
    { name: 'Leafy Green Crayola', color: '#69B09C' },
    { name: 'Poisonous green 2', color: '#498A78' },
    { name: 'Leafy Green Crayola 2', color: '#6AAE72' },
    { name: 'Poisonous green 3', color: '#3E8469' },
];

const BackgroundColor: React.FC = () => {
    // Access background color from context and the function to update it
    const { backgroundColor, setBackgroundColor } = useContext(BackgroundColorContext);

    return (
        // The container's background color is dynamically updated based on the selected color
        <View style={[styles.container, { backgroundColor }]}>
            <Text style={styles.title}>Background color</Text>
            <Text style={styles.subtitle}>Select colors for the background</Text>

            <View style={styles.colorGrid}>
                {colors.map((colorOption) => (
                    <TouchableOpacity
                        key={colorOption.name}
                        style={[styles.colorButton, { backgroundColor: colorOption.color }]}
                        onPress={() => setBackgroundColor(colorOption.color)} // Update background color on press
                    >
                        <Text style={styles.buttonText}>{colorOption.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 24,
        marginBottom: 10,
    },
    subtitle: {
        color: '#9e9e9e',
        fontSize: 16,
        marginBottom: 30,
    },
    colorGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    colorButton: {
        width: 130,
        height: 100,
        borderRadius: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
    },
});

export default BackgroundColor;
