// src/components/Title.tsx
import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface TitleProps {
  text: string;
}

export default function Title({ text }: TitleProps) {
  return <Text style={styles.title}>{text}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
});
