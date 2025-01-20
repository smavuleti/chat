// Import necessary libraries and components
import React from "react";
import { TouchableOpacity, StyleSheet, View, Text, Alert } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase Storage functions

const CustomActions = ({
  wrapperStyle,
  iconTextStyle,
  onSend,
  storage,
  userId,
}) => {
  const actionSheet = useActionSheet();

  const onActionPress = () => {
    const options = [
      "Choose From Library",
      "Take Picture",
      "Send Location",
      "Cancel",
    ];
    const cancelButtonIndex = options.length - 1;
    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            getLocation();
            return;
          default:
        }
      }
    );
  };

  // Function to upload an image to Firebase Storage and send its URL
  const uploadAndSendImage = async (imageUri) => {
    try {
      // Convert image URI to a Blob
      const response = await fetch(imageUri);
      const blob = await response.blob();

      // Create a unique filename for the image
      const imageName = `${Date.now()}-image`;

      // Get a reference to the Firebase Storage location
      const storageRef = ref(storage, `images/${imageName}`);

      // Upload the Blob to Firebase Storage
      await uploadBytes(storageRef, blob);

      // Get the download URL of the uploaded image
      const imageUrl = await getDownloadURL(storageRef);

      // Send the image message
      onSend({ image: imageUrl });
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Error", "Failed to upload image. Please try again.");
    }
  };

  const pickImage = async () => {
    try {
      // Request media library permissions
      const permissions =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissions.granted) {
        // Launch the image picker
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1, // Set image quality (1 = max quality)
        });

        if (!result.canceled) {
          // Pass the image URI to the upload function
          await uploadAndSendImage(result.assets[0].uri);
        }
      } else {
        Alert.alert("Permission Denied", "Cannot access media library.");
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "An error occurred while picking the image.");
    }
  };

  const takePhoto = async () => {
    try {
      const permissions = await ImagePicker.requestCameraPermissionsAsync();
      if (permissions.granted) {
        const result = await ImagePicker.launchCameraAsync();
        if (!result.canceled) {
          await uploadAndSendImage(result.assets[0].uri);
        }
      } else {
        Alert.alert("Permission Denied", "Cannot access camera.");
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Error", "An error occurred while taking the photo.");
    }
  };

  const getLocation = async () => {
    try {
      const isLocationEnabled = await Location.hasServicesEnabledAsync();
      if (!isLocationEnabled) {
        Alert.alert(
          "Location Services Disabled",
          "Please enable location services in your device settings."
        );
        return;
      }

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to send your current location."
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeout: 10000,
      });

      if (location) {
        onSend({
          text: "", // Ensure a `text` field is always present
          location: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          },
          createdAt: new Date(),
          user: {
            _id: userId, // Use the dynamic userId passed as prop
            name: "User", // Replace with the correct user name
          },
        });
      } else {
        Alert.alert("Error", "Failed to fetch your location.");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      if (error.code === "E_LOCATION_TIMEOUT") {
        Alert.alert(
          "Timeout",
          "Fetching your location took too long. Please try again."
        );
      } else {
        Alert.alert(
          "Error",
          "An unexpected error occurred while fetching your location."
        );
      }
    }
  };

  return (
    <TouchableOpacity
      accessible={true}
      accessibilityLabel="Input field option"
      accessibilityHint="Lets you select to pick an image, take a photo, or send a location."
      accessibilityRole="button"
      style={styles.container}
      onPress={onActionPress}
    >
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: "#b2b2b2",
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: "#b2b2b2",
    fontWeight: "bold",
    fontSize: 10,
    backgroundColor: "transparent",
    textAlign: "center",
  },
});

export default CustomActions;
