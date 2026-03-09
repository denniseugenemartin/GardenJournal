import React, { useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import DateTimePicker from "../components/date-time-picker";
import { S3Uploader } from "../components/s3-uploader";

export default function ObservationsScreen() {
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date());
  const [s3Url, setS3Url] = useState<string | null>(null);

  const saveObservation = () => {
    if (!s3Url) {
      Alert.alert("No photo", "Please take and upload a photo first.");
      return;
    }

    console.log("Observation note:", note);
    console.log("Observation date:", date.toLocaleDateString());
    console.log("Photo URL:", s3Url);

    Alert.alert(
      "Saved!",
      `Observation saved on ${date.toLocaleDateString()}\nPhoto URL: ${s3Url}`,
    );

    setNote("");
    setS3Url(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>Record Observations</Text>

      <DateTimePicker value={date} onChange={(newDate) => setDate(newDate)} />

      <S3Uploader onUploadComplete={(url) => setS3Url(url)} />

      <TextInput
        placeholder="Write your observation..."
        value={note}
        onChangeText={setNote}
        style={styles.input}
        multiline
      />

      <Button
        title="💾 Save Observation"
        onPress={saveObservation}
        disabled={!note && !s3Url}
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
