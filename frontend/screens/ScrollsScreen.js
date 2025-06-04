import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { fetchScrolls } from '../services/api';

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
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#8e44ad" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/splash.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>📜🗡️ Sacred Scrolls of Aetherion 🗡️📜</Text>
        <FlatList
          data={scrolls}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() =>
                navigation.navigate('ScrollDetail', { id: item.id })
              }
            >
              <Text style={styles.itemText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background
::contentReference[oaicite:0]{index=0}
 
