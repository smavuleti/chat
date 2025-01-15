import React, { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);

  // Extract the user's name and selected background color from route parameters
  const { name, background } = route.params;

  useEffect(() => {
    // Set the navigation title dynamically based on the user's name
    navigation.setOptions({ title: name });

    // Add initial system and user messages to the chat
    setMessages([
      {
        _id: 1,
        text: "Welcome to the chat!",
        createdAt: new Date(),
        system: true,
      },
      {
        _id: 2,
        text: "Hi developer?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Chat Assistant",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  // Handle sending messages
  const onSend = (newMessages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
  };

  return (
    <View style={{ flex: 1, backgroundColor: background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        {/* GiftedChat handles text rendering internally */}
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1, // Representing the current user
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
