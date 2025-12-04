// src/components/Button.tsx
import React from 'react';
import { TouchableOpacity, Text, GestureResponderEvent } from 'react-native';

interface ButtonProps {
  title: string;
  onPress?: (event?: GestureResponderEvent) => void;
  disabled?: boolean;
}

export default function Button({ title, onPress, disabled = false }: ButtonProps) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      accessibilityState={{ disabled }}
    >
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}
