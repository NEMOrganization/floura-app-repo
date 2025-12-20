// src/components/Title.tsx
import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

interface TitleProps {
  text: string;
  style?: TextStyle; //giver mulighed for at lave forskellig styling på diverse screens
}

export default function Summary({ text, style }: TitleProps) {
  return <Text style={[styles.text, style]}>{text}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: 'Roboto',
    marginBottom: 12,
    color: '#000',
  },
});