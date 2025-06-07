import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Alert,
  ImageBackground
} from "react-native";
import { getOracleInsights } from "../services/api";

export default function OracleScreen() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      Alert.alert("Error", "Please enter a prompt");
      return;
    }
    setLoading(true);
    try {
      const answer = await getOracleInsights(prompt);
      setResult(answer);
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/gate.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}> 🌿💫🌳 Grove Oracle 🌳💫🌿</Text>
        <TextInput
          style={styles.input}
          placeholder="Ask the oracle..."
          placeholderTextColor="#aaa"
          multiline
          value={prompt}
          onChangeText={setPrompt}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Get Insights</Text>
          )}
        </TouchableOpacity>

        {result && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>{result}</Text>
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: {
    flexGrow: 1,
    backgroundColor: "rgba(30, 30, 46, 0.8)",
    padding: 20
  },
  title: {
    fontSize: 24,
    color: "#e0c0ff",
    marginBottom: 20,
    textAlign: "center"
  },
  input: {
    backgroundColor: "#2e2e3e",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    height: 100,
    textAlignVertical: "top"
  },
  button: {
    backgroundColor: "#8e44ad",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20
  },
  buttonText: { color: "#fff", fontSize: 16 },
  resultContainer: {
    backgroundColor: "#2e2e3e",
    padding: 12,
    borderRadius: 8
  },
  resultText: { color: "#fff", fontSize: 14 }
});
