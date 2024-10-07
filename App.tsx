import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation/TabNavigator';
import { View, StyleSheet } from 'react-native';
import { BackgroundColorContext, BackgroundColorProvider } from './src/context/BackgroundColorContext'; // Import the context

function App(): React.JSX.Element {
    const backgroundColorContext = useContext(BackgroundColorContext);

    if (!backgroundColorContext) {
        throw new Error('BackgroundColorContext must be used within a BackgroundColorProvider');
    }

    const { backgroundColor } = backgroundColorContext;

    return (
        <BackgroundColorProvider>
        <View style={[styles.container, { backgroundColor }]}>
            <NavigationContainer>
                <TabNavigator />
            </NavigationContainer>
        </View>
        </BackgroundColorProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: 'AlegreyaSans-Regular', // Apply font globally if you want
    },
});

export default App;
