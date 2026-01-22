import React, { useState } from "react";
import { TextInput, StyleSheet, View, Text, TextInputProps, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    showToggle?: boolean;
}

export default function Input({ label, error, showToggle = false, style, secureTextEntry, ...props }: InputProps) {
    const [ showPassword, setShowPassword ] = useState(false);
    const isPasswordField = secureTextEntry ?? false;

    return (
        <View style={styles.wrapper}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View style={styles.inputWrapper}>
                <TextInput 
                    style={[ styles.input, error && styles.inputError, style ]}
                    placeholderTextColor="#8C7A6B"
                    secureTextEntry={isPasswordField && !showPassword}
                    {...props}
                />

                {isPasswordField && showToggle && (
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.eyeButton}
                    >
                        <Ionicons
                            name={showPassword ? "eye-off" : "eye"}
                            size={24}
                            color="#8C7A6B"
                        />
                    </TouchableOpacity>
                )}
            </View>

            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: { marginBottom: 20 },
    label: { marginBottom: 6, fontSize: 14, color: "#432323", fontWeight: "600" },
    inputWrapper: { position: "relative" },
    input: {
        height: 50,
        paddingHorizontal: 14,
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#D6CFC6",
        fontSize: 16,
        color: "#432323",
    },
    inputError: { borderColor: "#C0392B" },
    error: { marginTop: 4, fontSize: 12, color: "#C0392B" },
    eyeButton: { position: "absolute", right: 12, top: 0, bottom: 0, justifyContent: "center", alignItems: "center" },
});