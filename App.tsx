import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation/TabNavigator';
import { View, StyleSheet } from 'react-native';

function App(): React.JSX.Element {
    return (
        <View style={styles.container}>
            <NavigationContainer>
                <TabNavigator />
            </NavigationContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#253334',
        fontFamily: 'AlegreyaSans-Regular', // Apply font globally if you want
    },
});

export default App;
