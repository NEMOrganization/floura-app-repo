import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  onBack: () => void;
};

export default function BackHeader({ onBack }: Props) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.backButtonContainer}>
        <Text style={styles.backButton}>←</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  backButtonContainer: {
    backgroundColor: "rgba(255,255,255,0.3)",
    padding: 6,
    borderRadius: 12,
  },
  backButton: {
    fontSize: 24,
    color: "#000000ff",
  },
});
