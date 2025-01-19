// Import necessary libraries and components
import React, { useState, useEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { GiftedChat } from "react-native-gifted-chat"; // Chat UI library
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore"; // Firebase Firestore functions

const Chat = ({ route, navigation, db }) => {
  // State to store chat messages
  const [messages, setMessages] = useState([]);

  // Extract the user's name and selected background color from route parameters
  const { userId, name, background } = route.params;

  useEffect(() => {
        // Set the navigation title dynamically based on the user's name
    navigation.setOptions({ title: name });
  }, [name, navigation]);

  // Fetch and listen for messages in Firestore
  useEffect(() => {
    // Firestore query to fetch messages in descending order of creation
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

    // Real-time listener for Firestore messages
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        // Map the snapshot data into a format suitable for GiftedChat
        const fetchedMessages = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            _id: doc.id, // Use the Firestore document ID as the unique identifier for each message
            text: data.text, // The actual message text
            createdAt: data.createdAt.toDate(), // Convert Firestore's Timestamp to JavaScript Date object
            user: {
              _id: data.user || "Anonymous", // Use the user ID or fallback to "Anonymous" if not provided
              name: data.user || "Anonymous", // Use the user name or fallback to "Anonymous" if not provided
            },
          };
        });
        // Update the messages state with the fetched messages
        setMessages(fetchedMessages);
      },
      (error) => {
        console.error("Error fetching messages:", error.message);
      }
    );

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, [db]);

  // Function to handle sending a new message
  const onSend = (newMessages = []) => {
    const message = newMessages[0]; // Get the first message from the array
    addDoc(collection(db, "messages"), {
      text: message.text, // The text content of the message
      createdAt: new Date(), // Current timestamp
      user: name, // The name of the current user
    }).catch((error) => {
      console.error("Error adding message:", error.message);
    });
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
