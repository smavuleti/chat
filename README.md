ChatSphere - React Native Chat Application

ChatSphere is a mobile chat application built with React Native, designed for real-time communication. 
The app enables users to send messages, images, and share their location, ensuring a seamless and engaging chat experience.

Objective

To develop a fully functional mobile chat application using React Native, Expo, and Firebase technologies, 
optimized for both Android and iOS platforms.

Features

- Personalized Start Screen: Users can enter their name and select a background color for the chat interface.
- Real-Time Chat: Send and receive messages instantly using the Gifted Chat library.
- Image Sharing: Upload images from the phone's library or take photos directly using the camera.
- Location Sharing: Share real-time location with other users in the chat.
- Offline Message Storage: Access chat history offline using local storage.
- Accessibility: Fully compatible with screen readers for visually impaired users.

Technical Requirements

- Framework: React Native with Expo.
- Database: Google Firestore for storing chat conversations.
- Authentication: Anonymous login via Firebase Authentication.
- Image Storage: Firebase Cloud Storage for managing uploaded images.
- Chat Library: Gifted Chat for the chat interface and message functionality.
- Offline Support: AsyncStorage for local message storage.
- Location Data: Integration with map views for location sharing.


Screen Design

1. Start Screen:
   - Title: ChatSphere - Font size 45, weight 600, color #FFFFFF.
   - Input: Placeholder text "Your Name" - Font size 16, weight 300, color #757083.
   - Background color selection: Four color options #090C08, #474056, #8A95A5, #B9C6AE.
   - Start button: "Open Chat" - Font size 16, weight 600, color #FFFFFF, background #757083.

2. Chat Screen:
   - Displays messages, image previews, and location links.
   - Options to send text, images, and location.
