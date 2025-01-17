import React, { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
  const [messages, setMessages] = useState([]);

  // Extract the user's name and selected background color from route parameters
  const { userId, name, background } = route.params;

  useEffect(() => {
    // Set the navigation title dynamically based on the user's name
    navigation.setOptions({ title: name });
  }, [name, navigation]);

  useEffect(() => {
    // Firestore query to fetch messages in descending order of creation
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

    // Real-time listener for Firestore messages
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            _id: doc.id, // Use Firestore document ID as unique message ID
            text: data.text,
            createdAt: data.createdAt.toDate(), // Convert Firestore Timestamp to JavaScript Date
            user: {
              _id: data.user || "Anonymous", // Use 'Anonymous' if user field is not defined
              name: data.user || "Anonymous", // Use the user field for display
            },
          };
        });
        setMessages(fetchedMessages);
      },
      (error) => {
        console.error("Error fetching messages:", error.message);
      }
    );

    return () => {
      if (unsubscribe) unsubscribe(); // Cleanup listener on component unmount
    };
  }, [db]);

  // Function to handle sending messages
  const onSend = (newMessages = []) => {
    const message = newMessages[0];
    addDoc(collection(db, "messages"), {
      text: message.text,
      createdAt: new Date(), // Use the current timestamp for new messages
      user: name, // Add the current user's name to Firestore
    }).catch((error) => {
      console.error("Error adding message:", error.message);
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: userId,
            name,
          }}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
