// PersonalDiary.tsx
import React, {useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {BackgroundColorContext} from "../context/BackgroundColorContext.tsx";

const PersonalDiary: React.FC = () => {
    const { backgroundColor } = useContext(BackgroundColorContext);

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Text style={styles.text}>Personal Diary Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#253334',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 24,
    },
});

export default PersonalDiary;
