import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import { Image } from 'react-native';
import CustomBackButton from "../components/CustomBackButton.tsx";
import { BackgroundColorContext } from '../context/BackgroundColorContext'; // Import the context

const HomeStack = createStackNavigator();

const HomeStackNavigator: React.FC = () => {
    // Access background color from context
    const { backgroundColor } = useContext(BackgroundColorContext);

    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: true, // Show headers for this stack
                headerTitle: () => (
                    <Image
                        source={require('../assets/icons/HeaderLogo.png')}
                        style={{ width: 194 / 4.5, height: 214 / 4.5 }}
                    />
                ),
                headerStyle: {
                    backgroundColor: backgroundColor, // Use background color from context
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
            <HomeStack.Screen name="Home" component={HomeScreen} />
            {/* Add other screens if needed */}
        </HomeStack.Navigator>
    );
};

export default HomeStackNavigator;
