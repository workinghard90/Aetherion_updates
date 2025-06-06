import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Background image: place icon.png under frontend/assets/images/icon.png
export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../assets/images/icon.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Aetherion</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Oracle")}
        >
          <Text style={styles.buttonText}>▶ Grove Oracle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Vault")}
        >
          <Text style={styles.buttonText}>🏺 Vault of Awackaning </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: "rgba(30, 30, 46, 0.8)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  title: { fontSize: 28, color: "#e0c0ff", marginBottom: 30 },
  button: {
    backgroundColor: "#8e44ad",
    padding: 14,
    borderRadius: 8,
    marginVertical: 10,
    width: "80%",
    alignItems: "center"
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" }
});
