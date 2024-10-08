import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';

// Define a type for your route parameters
type RootStackParamList = {
    Sound: { label: string };
};

// Type the route prop with RouteProp
type SoundScreenRouteProp = RouteProp<RootStackParamList, 'Sound'>;

interface SoundScreenProps {
    route: SoundScreenRouteProp; // Use the typed route prop
}

const SoundScreen: React.FC<SoundScreenProps> = ({ route }) => {
    const { label } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sound Screen</Text>
            <Text style={styles.subtitle}>You selected: {label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 20,
        color: 'gray',
    },
});

export default SoundScreen;
