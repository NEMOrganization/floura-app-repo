import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text style={styles.text}>Henter data...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    textAlign: "center",
  },
});

export default LoadingScreen;
