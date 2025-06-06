import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function ScrollsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Sacred Scrolls</Text>
      <Text style={styles.paragraph}>
        Here you will find the wisdom of the Grove, the Codex of Aetherion, and
        more…
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "rgba(30, 30, 46, 0.9)",
    padding: 20
  },
  heading: {
    fontSize: 24,
    color: "#e0c0ff",
    marginBottom: 12,
    textAlign: "center"
  },
  paragraph: {
    fontSize: 16,
    color: "#fff",
    lineHeight: 24
  }
});
