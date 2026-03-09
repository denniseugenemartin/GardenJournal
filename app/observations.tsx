import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, Alert, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "../components/date-time-picker";


export default function ObservationsScreen() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date());

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Camera access is required to take a photo.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) setPhoto(result.assets[0].uri);
  };

  const saveObservation = () => {
    console.log("Photo URI:", photo);
    console.log("Note:", note);
    console.log("Date:", date.toLocaleDateString());
    Alert.alert("Saved!", `Observation saved on ${date.toLocaleDateString()} (dummy).`);
    setPhoto(null);
    setNote("");
  };

  
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>Record Observations</Text>

    <DateTimePicker
      value={date}
      onChange={(newDate) => setDate(newDate)}
    />


      {/* Photo preview */}
      {photo ? (
        <Image source={{ uri: photo }} style={styles.photoPreview} />
      ) : (
        <View style={styles.photoPlaceholder}>
          <Text style={{ color: "#888" }}>No photo taken yet</Text>
        </View>
      )}

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.buttonText}>📸 Take Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, (!photo && !note) && styles.buttonDisabled]}
          onPress={saveObservation}
          disabled={!photo && !note}
        >
          <Text style={styles.buttonText}>💾 Save Observation</Text>
        </TouchableOpacity>
      </View>

      {/* Text input */}
      <TextInput
        placeholder="Write your observation..."
        value={note}
        onChangeText={setNote}
        style={styles.input}
        multiline
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    paddingVertical: 20,
    gap: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dateButton: {
    backgroundColor: "#e0f2f1",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  dateButtonText: {
    fontSize: 16,
    color: "#00796b",
    fontWeight: "500",
  },
  photoPreview: {
    width: 250,
    height: 250,
    borderRadius: 12,
    marginVertical: 10,
  },
  photoPlaceholder: {
    width: 250,
    height: 250,
    borderRadius: 12,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    gap: 12,
  },
  button: {
    flex: 1,
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#a5d6a7",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "90%",
    padding: 12,
    borderRadius: 8,
    textAlignVertical: "top",
    minHeight: 100,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
});