import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
import Start from './components/Start';
import Chat from './components/Chat';

// Create a stack navigator
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      {/* Define the screens in the stack navigator */}
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
