// Import necessary libraries and components
import React, { useState, useEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { GiftedChat, InputToolbar } from "react-native-gifted-chat"; // Chat UI library
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore"; // Firebase Firestore functions
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from "./CustomActions"; // Custom actions for sending images, location, etc.
import MapView from "react-native-maps"; // MapView for displaying location messages
import { v4 as uuidv4 } from "uuid"; // Unique ID generator for messages

const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const [messages, setMessages] = useState([]); // State to store chat messages
  const { userId, name, background } = route.params; // Extract the user's name and selected background color from route parameters
  let unsubscribe;

  useEffect(() => {
    // Set the navigation title dynamically based on the user's name
    navigation.setOptions({ title: name });
  }, [name, navigation]);

  // Fetch and listen for messages in Firestore
  useEffect(() => {
    // Firestore query to fetch messages in descending order of creation
    if (isConnected) {
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

      // Real-time listener for Firestore messages
      unsubscribe = onSnapshot(q, (snapshot) => {
        // Map the snapshot data into a format suitable for GiftedChat
        const fetchedMessages = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            _id: doc.id, // Use the Firestore document ID as the unique identifier for each message
            text: data.text || "", // The actual message text
            createdAt: data.createdAt.toDate(), // Convert Firestore's Timestamp to JavaScript Date object
            user: {
              _id: data.user._id || "Anonymous", // Use the user ID or fallback to "Anonymous" if not provided
              name: data.user.name || "Anonymous", // Use the user name or fallback to "Anonymous" if not provided
            },
            location: data.location || null, // Include location if present
            image: data.image || null, // Include image if present
          };
        });
        // Cache fetched messages locally
        cacheMessages(fetchedMessages);

        // Update the messages state with the fetched messages
        setMessages(fetchedMessages);
      });
    } else {
      // Load cached messages if offline
      loadCachedMessages();
    }

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe && unsubscribe();
  }, [db, isConnected]);

  // Function to handle sending a new message
  const onSend = (newMessages = []) => {
    const message = newMessages[0]; // Get the first message from the array

    // Validate `userId` and `name` to ensure they are not undefined
    const userIdValid = userId || "Anonymous";
    const userNameValid = name || "Anonymous";

    // Prepare the message object
    const messageData = {
      text: message.text || "", // Default to empty string if no text
      createdAt: new Date(), // Current timestamp
      user: {
        _id: userIdValid,
        name: userNameValid,
      },
      ...(message.location && { location: message.location }), // Add location if present
      ...(message.image && { image: message.image }), // Add image URL if present
    };

    // Add the message to Firestore
    addDoc(collection(db, "messages"), messageData).catch((error) => {
      console.error("Error adding message:", error.message);
    });
  };

  // Load cached messages from AsyncStorage (for offline support)
  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem("messages")) || "[]";
    setMessages(JSON.parse(cachedMessages));
  };

  // Cache messages locally in AsyncStorage
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.error("Error caching messages:", error.message);
    }
  };

  // Render custom actions like sending images, locations, etc.
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    return null;
  };

  // Render custom actions like sending images, locations, etc.
  const renderCustomActions = (props) => {
    return (
      <CustomActions
        userId={userId}
        storage={storage}
        onSend={(newMessage) => {
          onSend([
            {
              ...newMessage,
              _id: uuidv4(),
              createdAt: new Date(),
              user: {
                _id: userId,
                name,
              },
            },
          ]);
        }}
        {...props}
      />
    );
  };

  // Render custom views like displaying locations on maps
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3,
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }

    return null;
  };

  return (
    // Main container with dynamic background color
    <View style={[styles.container, { backgroundColor: background }]}>
      <KeyboardAvoidingView
        // Adjust layout to avoid keyboard overlap
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <GiftedChat
          messages={messages} // Pass messages to GiftedChat for rendering
          onSend={(messages) => onSend(messages)} // Handle message sending
          renderInputToolbar={renderInputToolbar}
          renderActions={renderCustomActions}
          renderCustomView={renderCustomView}
          user={{
            _id: userId, // Pass the current user's ID to GiftedChat
            name, // Pass the current user's name
          }}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

// Define styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up the full screen
  },
});

// Export the Chat component as the default export
export default Chat;
