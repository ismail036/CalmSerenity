import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../screens/SettingsScreen';
import SleepTracking from '../screens/SleepTracking';
import BackgroundColor from '../screens/BackgroundColor';
import PersonalDiary from '../screens/PersonalDiary';
import { Image } from 'react-native';
import CustomBackButton from "../components/CustomBackButton"; // Import Image for custom header logo
import { BackgroundColorContext } from '../context/BackgroundColorContext'; // Import the background color context

const SettingsStack = createStackNavigator();

const SettingsStackNavigator: React.FC = () => {
    // Access the background color from the context
    const { backgroundColor } = useContext(BackgroundColorContext);

    return (
        <SettingsStack.Navigator
            initialRouteName="Settings"
            screenOptions={{
                headerShown: true, // Show headers for this stack
                headerTitle: () => (
                    <Image
                        source={require('../assets/icons/HeaderLogo.png')}
                        style={{ width: 194 / 4.5, height: 214 / 4.5 }}
                    />
                ),
                headerStyle: {
                    backgroundColor: backgroundColor, // Use the background color from context
                    height: 110,
                    shadowColor: 'transparent',
                    elevation: 0,
                },
                headerTitleAlign: 'center',
                headerTitleContainerStyle: {
                    shadowColor: 'transparent',
                    elevation: 0,
                },
                headerBackImage: () => <CustomBackButton />, // Use custom back button
                headerBackTitleVisible: false, // Hide the default back button title
            }}
        >
            <SettingsStack.Screen name="Settings" component={SettingsScreen} />
            <SettingsStack.Screen name="SleepTracking" component={SleepTracking} />
            <SettingsStack.Screen name="BackgroundColor" component={BackgroundColor} />
            <SettingsStack.Screen name="PersonalDiary" component={PersonalDiary} />
        </SettingsStack.Navigator>
    );
};

export default SettingsStackNavigator;
