import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MeditationScreen from '../screens/MeditationScreen';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ size, color }) => {
          let iconPath;

          if (route.name === 'Home') {
            iconPath = require('../assets/icons/Home.png'); // Home için PNG simge
          } else if (route.name === 'Meditation') {
            iconPath = require('../assets/icons/Sounds.png'); // Settings için PNG simge
          }else if (route.name === 'Settings') {
            iconPath = require('../assets/icons/Settings.png'); // Settings için PNG simge
          }

          return (
            <Image
              source={iconPath}
              style={{ width: size, height: size, tintColor: color }} // İkon boyutu ve rengi
              resizeMode="contain" // İkonun boyutunu doğru şekilde ölçeklemek için
            />
          );
        },
        tabBarActiveTintColor: '#000000', // Aktif simgelerin rengi siyah
        tabBarInactiveTintColor: 'gray',  // Pasif simgelerin rengi gri
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Meditation" component={MeditationScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
