// frontend/components/TempleOfTheElements.tsx

import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity
} from "react-native";

export default function TempleOfTheElements() {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Text style={styles.heading}>🜂🜃🜁🜄 Temple of the Elements</Text>
      <Text style={styles.paragraph}>
        Feel the flow of 🜂 (fire), 🜃 (earth), 🜁 (air), 🜄 (water). Enter in
        harmony.
      </Text>
      {/* Button kept for possible future interaction */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Enter the Temple</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(30, 30, 46, 0.95)",
    padding: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  heading: {
    fontSize: 28,
    color: "#e0c0ff",
    textAlign: "center",
    marginBottom: 20
  },
  paragraph: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 30
  },
  button: {
    backgroundColor: "#8e44ad",
    padding: 14,
    borderRadius: 8
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }
});
