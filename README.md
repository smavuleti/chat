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


## Setting Up iOS and Android Simulators

To run **ChatSphere** on simulators/emulators, you need to set up both **iOS Simulator (Xcode)** and **Android Emulator (Android Studio)** on your machine. Below are the instructions for setting them up.

### 1. **Setting Up iOS Simulator with Xcode**

To run the app on an iOS simulator, you will need to install **Xcode**. Here’s how:

#### **Prerequisites**:
- **macOS** (Xcode is only available for macOS)
- **Xcode**: Apple's IDE for developing software for iOS, macOS, watchOS, and tvOS.

#### **Steps to Install Xcode and iOS Simulator**:

1. **Install Xcode**:
   - Open the **Mac App Store** and search for **Xcode**.
   - Click **Install** or **Get** to download and install it.

2. **Install Xcode Command Line Tools**:
   - After installing Xcode, open a terminal and run the following command to install the necessary command line tools:
     ```bash
     xcode-select --install
     ```

3. **Open Xcode**:
   - Once installed, open **Xcode**.
   - Accept the license agreement if prompted.

4. **Install iOS Simulator**:
   - In **Xcode**, go to the **Xcode > Preferences > Components** tab.
   - Find the **Simulator** section and install the version of the simulator you need (e.g., iOS 16.0).

5. **Run the App on the iOS Simulator**:
   - In **Expo CLI**, simply run:
     ```bash
     expo start
     ```
   - Once the Expo Dev Tools open, click on **Run on iOS Simulator** or scan the QR code with **Expo Go**.

### 2. **Setting Up Android Emulator with Android Studio**

For Android, you’ll need to install **Android Studio**, which provides the necessary tools to create and run Android emulators.

#### **Prerequisites**:
- **Windows, macOS, or Linux**.
- **Android Studio**: The official IDE for Android development.

#### **Steps to Install Android Studio and Set Up the Emulator**:

1. **Install Android Studio**:
   - Go to the official **Android Studio website**: [Download Android Studio](https://developer.android.com/studio).
   - Follow the instructions for your operating system to download and install **Android Studio**.

2. **Set Up Android SDK**:
   - Once installed, launch **Android Studio** and follow the setup wizard to install the **Android SDK** and **Android Virtual Device (AVD)** components.

3. **Set Up Android Emulator**:
   - In **Android Studio**, open the **AVD Manager**:
     - Go to **Tools > AVD Manager**.
     - Click on **Create Virtual Device**.
     - Select a device model (e.g., Pixel 4), and then choose the desired system image (e.g., a version of Android 12).
     - Download the system image if needed and follow the prompts to set up the virtual device.

4. **Run the Emulator**:
   - Once your virtual device is set up, click **Play** (green triangle) to launch the Android emulator.
   - In **Expo CLI**, run:
     ```bash
     expo start
     ```
   - After Expo Dev Tools load, click on **Run on Android Emulator** or scan the QR code with **Expo Go**.

### 3. **Running the App on Simulators/Emulators**:

- Once both simulators (iOS and Android) are set up, you can run the app by using **Expo CLI**.
- Run the following command to start the development server:
  ```bash
  expo start




Firebase Project:
- Create a Firebase project via Firebase Console.
- Set up Firebase Firestore, Firebase Storage, and Firebase Authentication for anonymous login
- Get Firebase config details and add them to your project.
- Create a .env file in the root of the project and add the Firebase config variables. You can find these details in your Firebase Console under "Project Settings".



Acknowledgments
- React Native – https://reactnative.dev/
- Expo – https://expo.dev/
- Firebase – https://firebase.google.com/
- Gifted Chat – https://github.com/FaridSafi/react-native-gifted-chat
- MapView – https://github.com/react-native-maps/react-native-maps
- AsyncStorage – https://react-native-async-storage.github.io/async-storage/


 


