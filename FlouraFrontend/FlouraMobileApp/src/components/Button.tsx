// src/components/Button.tsx
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary" | "third";
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
    title, 
    onPress,
    disabled = false, 
    loading = false, 
    variant = "primary",
    style, 
    textStyle,

}: ButtonProps) {

    const variantStyles: Record<string, {button: ViewStyle, text: TextStyle}> = {
        primary: {
            button: {backgroundColor: "#FCF5EE"},
            text: {color: "#850E35"}
        }, 

        secondary: {
            button: {backgroundColor: "#FFC4C4"},
            text: {color: "#850E35"}
        },

        third: {
            button: {backgroundColor: "#BDD2B6"},
            text: {color: "#432323"}
        }
    };

    const currentVariant = variantStyles[variant];

    return (
        <TouchableOpacity
            testID="button-wrapper"
            accessibilityRole="button"
            disabled={disabled || loading}
            onPress={onPress}
            style={[styles.button, currentVariant.button, style, disabled && styles.disabled]}
            >
                {loading ? (
                    <ActivityIndicator testID="button-loader" />
                ) : (
                    <Text style={[styles.text, currentVariant.text, textStyle]}>{title}</Text>
                )}
            </TouchableOpacity>
        );
    }

    const styles = StyleSheet.create({
        button: {
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 20, 
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center"
        },
        disabled: {
            opacity: 0.5
        },
        text: {
            fontWeight: "400",
            fontSize: 18,
        }
    });
