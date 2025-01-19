// Import necessary libraries and components
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native"; // Navigation container for managing screen transitions
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // Stack navigator for managing screen hierarchy
import { LogBox, Alert } from "react-native"; // Utilities for React Native logging and alerts

// Import custom screens/components
import Start from "./components/Start"; // Starting screen component
import Chat from "./components/Chat"; // Chat screen component

// Import Firebase and network status monitoring utilities
import { initializeApp } from "firebase/app"; // Firebase initialization
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore"; // Firestore database functions
import { useNetInfo } from "@react-native-community/netinfo"; // Library to monitor network connectivity

// Suppress specific warning messages
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

// Create a stack navigator 
const Stack = createNativeStackNavigator(); 

const App = () => {
  // Web app's Firebase configuration
  const connectionStatus = useNetInfo();

  useEffect(() => {
    // Handle Firestore network enabling/disabling based on connection status
    if (connectionStatus.isConnected === false) {
      // Alert the user when the connection is lost
      Alert.alert("Connection Lost!", "You are now offline.");
      // Disable Firestore network to prevent unnecessary attempts to sync
      disableNetwork(db).catch((error) =>
        console.error("Failed to disable Firestore network:", error.message)
      );
    } else if (connectionStatus.isConnected === true) {
      // Re-enable Firestore network when the connection is restored
      enableNetwork(db).catch((error) =>
        console.error("Failed to enable Firestore network:", error.message)
      );
    }
  }, [connectionStatus.isConnected]); // Run this effect whenever the connection status changes

  // Firebase project configuration
  const firebaseConfig = {
    apiKey: "AIzaSyChOc9YtdBdMaFURB9fil8BT2PXvi8PxUs", // Your project's API key
    authDomain: "chatsphere-148d5.firebaseapp.com", // Your project's auth domain
    projectId: "chatsphere-148d5", // Your project's Firestore project ID
    storageBucket: "chatsphere-148d5.firebasestorage.app", // Your project's storage bucket
    messagingSenderId: "802092642442", // Your project's messaging sender ID
    appId: "1:802092642442:web:a836a33e68722ee2b73d73", // Your project's app ID
  };

  // Initialize Firebase 
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    // Navigation container to manage screen transitions
    <NavigationContainer>
      {/* Define the stack navigator and its screens */}
      <Stack.Navigator initialRouteName="Start">
        {/* Start screen */}
        <Stack.Screen name="Start" component={Start} />

        {/* Chat screen */}
        <Stack.Screen name="Chat">
          {(props) => (
            // Pass network status and Firestore instance as props to Chat component
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              {...props} // Pass any additional props
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Export the App component as the default export
export default App;
