import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity
} from "react-native";
import { Audio } from "expo-av";

export default function TempleOfTheElements() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const opacity = new Animated.Value(0);

  // Play the beacon-chord.wav on mount
  useEffect(() => {
    async function playSound() {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/sounds/beacon-chord.wav")
      );
      setSound(sound);
      await sound.playAsync();
    }
    playSound();
    // fade‐in animation
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true
    }).start();

    return () => {
      if (sound) sound.unloadAsync();
    };
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Text style={styles.heading}>🜂🜃🜁🜄 Temple of the Elements</Text>
      <Text style={styles.paragraph}>
        Feel the flow of 🜂 (fire), 🜃 (earth), 🜁 (air), 🜄 (water). Enter in
        harmony.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (sound) sound.replayAsync();
        }}
      >
        <Text style={styles.buttonText}>Play Beacon Chord Again</Text>
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
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" }
});
