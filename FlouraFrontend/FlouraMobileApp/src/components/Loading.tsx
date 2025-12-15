import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const LoadingScreen = () => {
  const pasteAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pasteAnim, { toValue: 1, duration: 650, useNativeDriver: true }),
        Animated.timing(pasteAnim, { toValue: 0, duration: 650, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const scaleX = pasteAnim.interpolate({ inputRange: [0, 1], outputRange: [0.2, 1] });

  return (
    <View style={styles.container}>
      <View style={styles.brushRow}>
        <Text style={styles.brush}>🪥</Text>

        <View style={styles.brushHead}>
          <Animated.View style={[styles.paste, { transform: [{ scaleX }] }]} />
          <View style={styles.bristles} />
        </View>
      </View>

      <Text style={styles.text}>Indlæser historier…</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9FFE6", // mint fra jeres palette
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  brushRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  brush: {
    fontSize: 44,
    marginRight: 10,
  },
  brushHead: {
    width: 120,
    height: 34,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingHorizontal: 10,
    overflow: "hidden",
  },
  bristles: {
    position: "absolute",
    right: 10,
    top: 8,
    width: 28,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#F5FBC1", // gul fra jeres palette
    opacity: 0.95,
  },
  paste: {
    height: 12,
    width: 70,
    borderRadius: 999,
    backgroundColor: "#FF9AA2", // coral fra jeres palette
    opacity: 0.9,
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2E2E2E",
  },
});

export default LoadingScreen;
