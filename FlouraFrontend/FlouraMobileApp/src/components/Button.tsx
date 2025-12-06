// src/components/Button.tsx
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary";
}

export default function Button({
    title, 
    onPress,
    disabled = false, 
    loading = false, 
    variant = "primary"
}: ButtonProps) {

    const stylesForVariant = {
        primary: {backgroundColor: "#007AFF"}, 
        secondary: {backgroundColor: "#888"}
    }[variant];

    return (
        <TouchableOpacity
            testID="button-wrapper"
            accessibilityRole="button"
            disabled={disabled || loading}
            onPress={onPress}
            style={[styles.button, stylesForVariant, disabled && styles.disabled]}
            >
                {loading ? (
                    <ActivityIndicator testID="button-loader" />
                ) : (
                    <Text style={styles.text}>{title}</Text>
                )}
            </TouchableOpacity>
        );
    }

    const styles = StyleSheet.create({
        button: {
            padding: 12,
            borderRadius: 8, 
            alignItems: "center",
            justifyContent: "center"
        },
        disabled: {
            opacity: 0.5
        },
        text: {
            color: "white",
            fontWeight: "600"
        }
    });
