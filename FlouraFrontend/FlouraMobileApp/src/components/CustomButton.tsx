import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary" | "third" | "text";
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function CustomButton({
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
        },
        text: {
            button: {backgroundColor: "transparent"},
            text: {color: "#850E35"}
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
                    <ActivityIndicator testID="button-loader" color={currentVariant.text.color}/>
                ) : (
                    <Text style={[styles.text, currentVariant.text, textStyle]}>{title}</Text>
                )}
            </TouchableOpacity>
        );
    }

    const styles = StyleSheet.create({
       button: {
            paddingVertical: 14,
            paddingHorizontal: 28,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            minWidth: 120,
        },
        disabled: { opacity: 0.5 },
        text: { fontWeight: "500", fontSize: 18 },
    });
