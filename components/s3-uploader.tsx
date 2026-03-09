import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  onUploadComplete: (url: string) => void;
};

export const S3Uploader: React.FC<Props> = ({ onUploadComplete }) => {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const pickImage = async () => {
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Camera roll access is required.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      let uri = result.assets[0].uri;
      if (Platform.OS !== "android") {
        uri = uri.replace("file://", "");
      }

      setPhotoUri(uri);

      // Determine MIME type
      let type = result.assets[0].type || "image/jpeg";
      if (!type.includes("/")) type = "image/jpeg";

      // Determine file name
      const fileName = result.assets[0].fileName || `photo-${Date.now()}.jpg`;

      // Upload
      uploadToS3(uri, type, fileName);
    }
  };

  const uploadToS3 = async (uri: string, type: string, fileName: string) => {
    try {
      // 1️⃣ Get signed URL from backend
      const query = `fileName=${encodeURIComponent(fileName)}&fileType=${encodeURIComponent(type)}`;
      const res = await fetch(
        `http://192.168.1.207:8081/get-upload-url?${query}`,
      );
      const data = await res.json();

      if (!data.signedRequest || !data.url) {
        Alert.alert("Error", "Failed to get signed URL");
        return;
      }

      // 2️⃣ Convert local file to blob
      const fileResponse = await fetch(uri);
      const blob = await fileResponse.blob();

      // 3️⃣ Upload using fetch
      const uploadResponse = await fetch(data.signedRequest, {
        method: "PUT",
        body: blob,
        headers: {
          "Content-Type": type,
        },
      });

      if (!uploadResponse.ok) {
        console.log("S3 Upload failed:", await uploadResponse.text());
        Alert.alert("Error", "Failed to upload image to S3");
        return;
      }

      // ✅ Upload success
      setUploadProgress(1);
      onUploadComplete(data.url);
      Alert.alert("Success", "Image uploaded!");
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Error", "Something went wrong during upload");
    }
  };

  return (
    <View style={styles.container}>
      {photoUri ? (
        <Image source={{ uri: photoUri }} style={styles.image} />
      ) : (
        <Text style={styles.placeholder}>No photo selected</Text>
      )}

      {uploadProgress > 0 && uploadProgress < 1 && (
        <Text>Uploading: {(uploadProgress * 100).toFixed(0)}%</Text>
      )}

      <Button title="Pick an Image" onPress={pickImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 16, alignItems: "center" },
  image: { width: 250, height: 250, borderRadius: 12, marginBottom: 8 },
  placeholder: { color: "#888", marginBottom: 8 },
});
