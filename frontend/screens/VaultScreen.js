import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  ImageBackground,
} from "react-native";
import { uploadMemory, downloadMemory } from "../services/api";

export default function VaultScreen({ navigation }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState("");

  const handleUpload = async () => {
    if (!content.trim()) {
      Alert.alert("Error", "Please write something to upload");
      return;
    }
    setLoading(true);
    try {
      await uploadMemory(content);
      Alert.alert("Success", "Memory uploaded");
    } catch (err) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      const res = await downloadMemory(1); // example: ID 1
      if (res.content) {
        setDownloaded(res.content);
      } else {
        Alert.alert("Error", res.msg || "Download failed");
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/favicon.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>🔐 Vault</Text>
          <TextInput
            style={styles.input}
            placeholder="Write a memory..."
            placeholderTextColor="#aaa"
            multiline
            value={content}
            onChangeText={setContent}
          />
          <TouchableOpacity style={styles.button} onPress={handleUpload}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Upload Memory</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleDownload}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Download Memory #1</Text>
            )}
          </TouchableOpacity>
          {downloaded ? (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>{downloaded}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "#e0c0ff",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "rgba(46, 46, 62, 0.9)",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#8e44ad",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  resultContainer: {
    backgroundColor: "rgba(46, 46, 62, 0.9)",
    padding: 12,
    borderRadius: 8,
  },
  resultText: {
    color: "#fff",
    fontSize: 14,
  },
});
