import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Dimensions } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MeditationScreen from '../screens/MeditationScreen';

// Ekran genişliğini alıyoruz
const { width, height } = Dimensions.get('window');

const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    let iconPath;

                    // Yüzdelik olarak ikon boyutunu ayarlıyoruz
                    const iconSize = focused ? width * 0.08 : width * 0.06; // Aktif ikon %8, pasif ikon %6 genişlikte

                    if (route.name === 'Meditation') {
                        iconPath = require('../assets/icons/Home.png'); // Meditation için PNG simge
                    } else if (route.name === 'Home') {
                        iconPath = require('../assets/icons/Sounds.png'); // Home için PNG simge
                    } else if (route.name === 'Settings') {
                        iconPath = require('../assets/icons/Settings.png'); // Settings için PNG simge
                    }

                    return (
                        <Image
                            source={iconPath}
                            style={{ width: iconSize, height: iconSize, tintColor: color }}
                        />
                    );
                },
                tabBarActiveTintColor: '#ffffff',
                tabBarInactiveTintColor: '#7f8c8d',
                tabBarStyle: {
                    backgroundColor: '#253334',
                    height: 55,
                    borderTopWidth: 0, // Çizgiyi kaldırmak için border'ı sıfırlıyoruz
                    shadowColor: 'transparent', // Gölgeyi kaldırmak için şeffaf yapıyoruz
                    elevation: 0, // Android için gölgeyi kaldırıyoruz
                },
                // Header'da yazı yerine logo gösteriyoruz
                headerTitle: () => (
                    <Image
                        source={require('../assets/icons/HeaderLogo.png')} // Header'da ortada gösterilecek logo
                        style={{ width: 194 / 4.5, height: 214 / 4.5}} // Logonun boyutu
                    />
                ),
                headerStyle: {
                    backgroundColor: '#253334',
                    height: 110, // Header yüksekliği
                    shadowColor: 'transparent', // Gölgeyi kaldırmak için şeffaf yap
                    elevation: 0, // Android'de gölgeyi kaldırmak için
                },
                headerTitleAlign: 'center', // Logoyu tam ortada hizalar
                headerTitleContainerStyle: {
                    shadowColor: 'transparent', // Gölgeyi kaldırmak için şeffaf yap
                    elevation: 0,
                },
            })}
        >
            <Tab.Screen
                name="Meditation"
                component={MeditationScreen}
                options={{ tabBarLabel: () => null }} // İkonun altındaki yazıyı gizler
            />
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ tabBarLabel: () => null }} // İkonun altındaki yazıyı gizler
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ tabBarLabel: () => null }} // İkonun altındaki yazıyı gizler
            />
        </Tab.Navigator>
    );
}

export default TabNavigator;
