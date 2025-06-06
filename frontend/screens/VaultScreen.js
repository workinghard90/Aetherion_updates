import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  ScrollView
} from "react-native";
import { uploadMemory, downloadMemories } from "../services/api";

export default function VaultScreen({ navigation }: any) {
  const [content, setContent] = useState("");

  const handleUpload = async () => {
    try {
      // For demo, hardcode userId = 1
      await uploadMemory(1, content);
      Alert.alert("Success", "Memory uploaded!");
      setContent("");
    } catch (err: any) {
      Alert.alert("Upload Error", err.message);
    }
  };

  const handleDownload = async () => {
    try {
      const memories = await downloadMemories(1);
      Alert.alert("Downloaded Memories", JSON.stringify(memories));
    } catch (err: any) {
      Alert.alert("Download Error", err.message);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/splash.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🏺 Memory Vault</Text>
        <TextInput
          style={styles.input}
          placeholder="Write your memory here..."
          placeholderTextColor="#aaa"
          multiline
          value={content}
          onChangeText={setContent}
        />
        <TouchableOpacity style={styles.button} onPress={handleUpload}>
          <Text style={styles.buttonText}>Upload Memory</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDownload}>
          <Text style={styles.buttonText}>Download Memory</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: {
    flexGrow: 1,
    backgroundColor: "rgba(30, 30, 46, 0.8)",
    padding: 20,
    alignItems: "center"
  },
  title: { fontSize: 24, color: "#e0c0ff", marginBottom: 20 },
  input: {
    width: "100%",
    backgroundColor: "#2e2e3e",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    minHeight: 120,
    textAlignVertical: "top"
  },
  button: {
    backgroundColor: "#8e44ad",
    padding: 14,
    borderRadius: 8,
    marginVertical: 10,
    width: "100%",
    alignItems: "center"
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" }
});
