import React, { useState } from "react";
import { StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { router } from "expo-router";

import Title from "../components/Title";
import CustomButton from "../components/CustomButton";
import Input from "../components/Input";
import { authService } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function RegisterScreen() {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const [ errorEmail, setErrorEmail ] = useState<string | null>(null);
    const [ errorPassword, setErrorPassword ] = useState<string | null>(null);
    const { signInWithToken } = useAuth();

    const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

    const isValidPassword = (password: string) => {
        const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        return regex.test(password);
    };


    const handleRegister = async () => {
        let hasError = false;
        setErrorEmail(null);
        setErrorPassword(null);

        if (!email) {
            setErrorEmail("Email er påkrævet");
            hasError = true;
        } else if (!isValidEmail(email)) {
            setErrorEmail("Indtast en gyldig email");
            hasError = true;
        }
        if (!password) {
            setErrorPassword("Adgangskode er påkrævet");
            hasError = true;
        } else if (!isValidPassword(password)) {
            setErrorPassword("Min. 8 tegn, 1 stort bogstav og 1 tal");
            hasError = true;
        }

        if (hasError) return;

        try {
            setLoading(true);
            const { token } = await authService.register({ email, password });
            await signInWithToken(token);
        } catch (error: any) {
            Alert.alert("Fejl", error.message || "Kunne ikke oprette bruger");
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <Title text="Opret bruger" style={{ color: "#850E35", fontSize: 30 }} />

                <Input
                    label="Email"
                    placeholder="Indtast email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    returnKeyType="next"
                    error={errorEmail ?? undefined}
                />

                <Input
                    label="Adgangskode"
                    placeholder="Indtast adgangskode"
                    showToggle
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    returnKeyType="done"
                    onSubmitEditing={handleRegister}
                    error={errorPassword ?? undefined}
                />

                <CustomButton
                    title={loading ? "Opretter..." : "Opret bruger"}
                    variant="third"
                    onPress={handleRegister}
                    disabled={loading}
                    loading={loading}
                />

                <CustomButton
                    title="Tilbage til login"
                    variant="text"
                    onPress={() => router.back()}
                />
            </ScrollView>
        </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#FCF9EA",
  },
});