import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
  // Extract the user's name and selected background color from route parameters
  const { name, background } = route.params;

  // Set the screen title dynamically based on the user's name
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, [name, navigation]);

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <Text style={styles.welcomeText}>Welcome to the Chat, {name}!</Text>
    </View>
  );
};

// Styles for the Chat screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    color: '#FFF',
  },
});

export default Chat;
