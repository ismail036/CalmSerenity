import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation/TabNavigator';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

export default App;
