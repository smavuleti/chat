import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
import Start from './components/Start';
import Chat from './components/Chat';

// Create a stack navigator
const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const App = () => {
  // Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChOc9YtdBdMaFURB9fil8BT2PXvi8PxUs",
  authDomain: "chatsphere-148d5.firebaseapp.com",
  projectId: "chatsphere-148d5",
  storageBucket: "chatsphere-148d5.firebasestorage.app",
  messagingSenderId: "802092642442",
  appId: "1:802092642442:web:a836a33e68722ee2b73d73"
};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  return (
    <NavigationContainer>
      {/* Define the screens in the stack navigator */}
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen
         name="Chat"
       >
         {props => <Chat db={db} {...props} />}
       </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
