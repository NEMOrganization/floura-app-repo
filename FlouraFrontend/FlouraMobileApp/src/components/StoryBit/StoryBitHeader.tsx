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
            <TouchableOpacity onPress={onBack} style={styles.backButtonContainer}>
                <Text style={styles.backButton}>←</Text>
            </TouchableOpacity>
            <View style={styles.progressContainer}>
              <Text style={styles.progress}>{currentIndex + 1} / {totalBits}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  backButtonContainer: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    padding: 6,
    borderRadius: 12,
  },
  backButton: {
    fontSize: 24,
    color: '#000000ff', // playful dark accent
  },
  progressContainer: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  progress: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Roboto',
  },
});