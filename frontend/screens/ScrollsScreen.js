import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { fetchScrolls } from "../services/api";

export default function ScrollsScreen({ navigation }) {
  const [scrolls, setScrolls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadScrolls = async () => {
      try {
        const res = await fetchScrolls();
        setScrolls(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadScrolls();
  }, []);

  if (loading) {
    return (
      <ImageBackground
        source={require("../assets/splash.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#8e44ad" />
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/splash.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>📜 Sacred Scrolls</Text>
          <FlatList
            data={scrolls}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate("ScrollDetail", { id: item.id })}
              >
                <Text style={styles.itemText}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  item: {
    padding: 12,
    backgroundColor: "rgba(46, 46, 62, 0.9)",
    borderRadius: 6,
    marginBottom: 10,
  },
  itemText: {
    color: "#fff",
    fontSize: 16,
  },
});
