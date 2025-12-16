import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
    currentIndex: number;
    totalBits: number;
    onBack: () => void;
};

export default function StoryBitHeader({ currentIndex, totalBits, onBack }: Props) {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={onBack}>
                <Text style={styles.backButton}>← Tilbage</Text>
            </TouchableOpacity>
            <Text style={styles.progress}>{currentIndex + 1} / {totalBits}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
      header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    fontSize: 16,
    color: "#007AFF",
  },
  progress: {
    fontSize: 16,
    fontWeight: "bold",
  },
});