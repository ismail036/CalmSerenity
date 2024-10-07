// SettingsScreen.tsx
import React, {useContext} from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { SettingsStackParamList } from '../navigation/SettingsStackNavigator';
import {BackgroundColorContext} from "../context/BackgroundColorContext.tsx";

type SettingsScreenNavigationProp = StackNavigationProp<SettingsStackParamList, 'Settings'>;

const Settings: React.FC = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();

    const { backgroundColor } = useContext(BackgroundColorContext);

    return (
        <View style={[styles.container, {backgroundColor}]}>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.imageButton}
                    onPress={() => navigation.navigate('SleepTracking')}  // SleepTracking ekranına git
                >
                    <Image
                        source={require('../assets/images/SleepTracking.png')}
                        style={styles.toolImage}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.imageButton}
                    onPress={() => navigation.navigate('BackgroundColor')}  // BackgroundColor ekranına git
                >
                    <Image
                        source={require('../assets/images/BackgroundColor.png')}
                        style={styles.toolImage}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.imageButton}
                    onPress={() => navigation.navigate('PersonalDiary')}  // PersonalDiary ekranına git
                >
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
        flex: 1, // Ekranın tamamını kapla
        backgroundColor: '#253334',
        padding: 20,
        justifyContent: 'center', // İçeriği dikeyde ortala
    },
    buttonsContainer: {
        flexDirection: 'row', // Butonları yatayda hizala
        flexWrap: 'wrap', // Gerekirse bir sonraki satıra geçir
        justifyContent: 'space-between', // Butonları eşit dağıt
        alignItems: 'center', // Çapraz eksende ortala
    },
    imageButton: {
        width: '45%',
        aspectRatio: 1,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 20, // Satırlar arasında boşluk bırak
    },
    toolImage: {
        width: '100%',
        height: '100%',
    },
});

export default Settings;
