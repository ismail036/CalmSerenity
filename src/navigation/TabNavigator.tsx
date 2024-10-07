import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Dimensions } from 'react-native';
import MeditationStackNavigator from './MeditationStackNavigator';
import HomeStackNavigator from './HomeStackNavigator';
import SettingsStackNavigator from './SettingsStackNavigator';
import { BackgroundColorContext } from '../context/BackgroundColorContext'; // Import the context

const { width } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

function TabNavigator() {
    // Access background color from context
    const { backgroundColor } = useContext(BackgroundColorContext);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    let iconPath;
                    const iconSize = focused ? width * 0.08 : width * 0.06;

                    if (route.name === 'Meditation') {
                        iconPath = require('../assets/icons/Home.png');
                    } else if (route.name === 'Home') {
                        iconPath = require('../assets/icons/Sounds.png');
                    } else if (route.name === 'Settings') {
                        iconPath = require('../assets/icons/Settings.png');
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
                    backgroundColor: backgroundColor, // Use background color from context
                    height: 55,
                    borderTopWidth: 0,
                    shadowColor: 'transparent',
                    elevation: 0,
                },
            })}
        >
            <Tab.Screen
                name="Meditation"
                component={MeditationStackNavigator}
                options={{ tabBarLabel: () => null, headerShown: false }}
            />
            <Tab.Screen
                name="Home"
                component={HomeStackNavigator}
                options={{ tabBarLabel: () => null, headerShown: false }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsStackNavigator}
                options={{ tabBarLabel: () => null, headerShown: false }}
            />
        </Tab.Navigator>
    );
}

export default TabNavigator;
