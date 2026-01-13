// src/components/Title.tsx
import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

interface TitleProps {
  text: string;
  style?: TextStyle; //giver mulighed for at lave forskellig styling på diverse screens
}

export default function Title({ text, style }: TitleProps) {
  return <Text style={[styles.title, style]}>{text}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    color: '#000', 
    textAlign: 'center',
    fontFamily: 'Roboto'
  },
});
