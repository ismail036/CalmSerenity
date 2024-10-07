import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MeditationScreen from '../screens/MeditationScreen';
import { Image } from 'react-native';
import { BackgroundColorContext } from '../context/BackgroundColorContext'; // Import the context

const MeditationStack = createStackNavigator();

const MeditationStackNavigator: React.FC = () => {
    // Access background color from context
    const { backgroundColor } = useContext(BackgroundColorContext);

    return (
        <MeditationStack.Navigator
            screenOptions={{
                headerShown: true, // Show the header to apply customizations
                headerTitle: () => (
                    <Image
                        source={require('../assets/icons/HeaderLogo.png')}
                        style={{ width: 194 / 4.5, height: 214 / 4.5 }}
                    />
                ),
                headerStyle: {
                    backgroundColor: backgroundColor, // Use dynamic background color from context
                    height: 110,
                    shadowColor: 'transparent',
                    elevation: 0,
                },
                headerTitleAlign: 'center',
                headerTitleContainerStyle: {
                    shadowColor: 'transparent',
                    elevation: 0,
                },
            }}
        >
            <MeditationStack.Screen name="Meditation" component={MeditationScreen} />
            {/* Add other screens if needed */}
        </MeditationStack.Navigator>
    );
};

export default MeditationStackNavigator;
