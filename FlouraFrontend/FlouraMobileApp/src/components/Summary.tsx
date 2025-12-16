// src/components/Title.tsx
import React from 'react';
import { Text, StyleSheet } from 'react-native';


export default function Summary({ text }: { text: string }) {
  return <Text style={styles.text}>{text}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    marginBottom: 12,
  },
});