# ChatSphere - React Native Chat Application

ChatSphere is a mobile chat application built with React Native, designed for real-time communication. The app enables users to send messages, images, and share their location, ensuring a seamless and engaging chat experience.

## Objective

To develop a fully functional mobile chat application using React Native, Expo, and Firebase technologies, optimized for both Android and iOS platforms.

## Features

- **Personalized Start Screen**: Users can enter their name and select a background color for the chat interface.
- **Real-Time Chat**: Send and receive messages instantly using the Gifted Chat library.
- **Image Sharing**: Upload images from the phone's library or take photos directly using the camera.
- **Location Sharing**: Share real-time location with other users in the chat.
- **Offline Message Storage**: Access chat history offline using local storage.
- **Accessibility**: Fully compatible with screen readers for visually impaired users.

## Technical Requirements

- **Framework**: React Native with Expo.
- **Database**: Google Firestore for storing chat conversations.
- **Authentication**: Anonymous login via Firebase Authentication.
- **Image Storage**: Firebase Cloud Storage for managing uploaded images.
- **Chat Library**: Gifted Chat for the chat interface and message functionality.
- **Offline Support**: AsyncStorage for local message storage.
- **Location Data**: Integration with map views for location sharing.

## Installation Instructions

### Prerequisites
- Clone the repository:
  ```bash
  git clone https://github.com/your-username/ChatSphere.git
  cd ChatSphere

- Node.js and npm (or yarn) installed on your system.
- Expo CLI installed. You can install it by running:
  ```bash
  npm install 
  npm install -g expo-cli


  yarn install


Firebase Project:
- Create a Firebase project via Firebase Console.
- Set up Firebase Firestore, Firebase Storage, and Firebase Authentication for anonymous login
- Get Firebase config details and add them to your project.
- Create a .env file in the root of the project and add the Firebase config variables. You can find these details in your Firebase Console under "Project Settings".

  ### Start the App:
- Now you can start the app using Expo:
  ```bash
  expo start


Acknowledgements
- React Native – https://reactnative.dev/
- Expo – https://expo.dev/
- Firebase – https://firebase.google.com/
- Gifted Chat – https://github.com/FaridSafi/react-native-gifted-chat
- MapView – https://github.com/react-native-maps/react-native-maps
- AsyncStorage – https://react-native-async-storage.github.io/async-storage/


 


