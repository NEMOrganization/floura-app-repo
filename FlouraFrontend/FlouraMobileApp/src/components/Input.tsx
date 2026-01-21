import React from "react";
import { TextInput, StyleSheet, View, Text, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
}

export default function Input({ label, error, style, ...props }: InputProps) {
 return (
    <View style={styles.wrapper}>
        {label && <Text style={styles.label}>{label}</Text>}

        <TextInput 
            style={[
                styles.input, 
                error && styles.inputError, 
                style,
            ]}
            placeholderTextColor="#8C7A6B"
            {...props}
        />

        {error && <Text style={styles.error}>{error}</Text>}
    </View>
 )
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    color: "#432323",
    fontWeight: "600",
  },
  input: {
    height: 48,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D6CFC6",
    fontSize: 16,
    color: "#432323",
  },
  inputError: {
    borderColor: "#C0392B",
  },
  error: {
    marginTop: 4,
    fontSize: 12,
    color: "#C0392B",
  },
});