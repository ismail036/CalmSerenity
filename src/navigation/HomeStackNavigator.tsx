import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MusicScreen from '../screens/MusicScreen';
import SoundScreen from '../screens/SoundScreen';
import { Image } from 'react-native';
import CustomBackButton from "../components/CustomBackButton.tsx";
import { BackgroundColorContext } from '../context/BackgroundColorContext';
import MusicDetailScreen from "../screens/MusicDetailScreen.tsx";
import {Song} from "../types/Song.ts";
import SoundDetailScreen from "../screens/SoundDetailScreen.tsx";

// Define a type for the stack parameters
type RootStackParamList = {
    Home: undefined;
    Music: { label: string };
    Sound: { label: string };
    MusicDetail: { song: Song };  // This expects a song object to be passed

};

const HomeStack = createStackNavigator<RootStackParamList>();



const HomeStackNavigator: React.FC = () => {
    const { backgroundColor } = useContext(BackgroundColorContext);

    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: true,
                headerTitle: () => (
                    <Image
                        source={require('../assets/icons/HeaderLogo.png')}
                        style={{ width: 194 / 4.5, height: 214 / 4.5 }}
                    />
                ),
                headerStyle: {
                    backgroundColor: backgroundColor,
                    height: 110,
                    shadowColor: 'transparent',
                    elevation: 0,
                },
                headerTitleAlign: 'center',
                headerTitleContainerStyle: {
                    shadowColor: 'transparent',
                    elevation: 0,
                },
                headerBackImage: () => <CustomBackButton />,
                headerBackTitleVisible: false,
            }}
        >
            <HomeStack.Screen name="Home" component={HomeScreen} />
            <HomeStack.Screen name="Music" component={MusicScreen} />
            <HomeStack.Screen name="Sound" component={SoundScreen} />
            <HomeStack.Screen name="MusicDetail" component={MusicDetailScreen} />
            <HomeStack.Screen name="SoundDetail" component={SoundDetailScreen} />


        </HomeStack.Navigator>
    );
};

export default HomeStackNavigator;
