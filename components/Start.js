import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity } from 'react-native';

const Start = ({ navigation }) => {
  // State to store the user's name
  const [name, setName] = useState('');

  // Predefined color options for the chat background
  const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

  // State to store the selected background color
  const [background, setBackground] = useState('');

  return (
    <View style={styles.container}>
      {/* Background image */}
      <ImageBackground
        source={require('../assets/StartImage.png')}
        style={styles.imageBackground}
      >
        {/* App title */}
        <Text style={styles.title}>ChatSphere</Text>

        {/* Input box */}
        <View style={styles.box}>
          {/* Text input for user's name */}
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Your Name"
            placeholderTextColor="#757083"
          />

          {/* Background color selection prompt */}
          <Text style={styles.chooseBgColor}>Style Your Chat</Text>

          {/* Color selection buttons */}
          <View style={styles.colorButtonContainer}>
            {colors.map((color, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.colorButton,
                  { backgroundColor: color },
                  background === color && styles.selectedColor, // Highlight selected color
                ]}
                onPress={() => setBackground(color)}
              />
            ))}
          </View>

          {/* Start Chat button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Chat', { name, background })}
            disabled={!name || !background} // Disable button if name or color is not selected
          >
            <Text style={styles.buttonText}>Open Chat</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

// Styles for the Start screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#533838',
    marginBottom: 25,
  },
  box: {
    backgroundColor: '#F2F2F2',
    width: '90%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 10,
    padding: 15,
    marginTop: 'auto', 
    marginBottom: 50,  
  },
  textInput: {
    width: '88%',
    borderColor: '#757083',
    borderRadius: 4,
    borderWidth: 1,
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    padding: 10,
  },
  chooseBgColor: {
    color: '#757083',
    fontSize: 16,
    fontWeight: '300',
  },
  colorButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#757083',
    borderRadius: 4,
    width: '88%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    opacity: 0.9,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default Start;
