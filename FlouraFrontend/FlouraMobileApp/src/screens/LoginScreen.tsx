import React, { useState } from "react";
import { Text, View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useAuth } from "../context/AuthContext";
import { router } from "expo-router";

import Title from "../components/Title";
import Input from "../components/Input";
import CustomButton from "../components/CustomButton";

export default function LoginScreen() {
    const { signIn } = useAuth();
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ errorEmail, setErrorEmail ] = useState<string | null>(null);
    const [ errorPassword, setErrorPassword ] = useState<string | null>(null);
    const [ generelError, setGenerelError ] = useState<string | null>(null);
    const [ loading, setLoading ] = useState(false);

    const handleLogin = async () => {
        setErrorEmail(null);
        setErrorPassword(null);

        let hasError = false;

        if (!email) {
            setErrorEmail("Email er påkrævet");
            hasError = true;
        }
        if (!password) {
            setErrorPassword("Adgangskode er påkrævet");
            hasError = true;
        }
        if (hasError) return;

        setLoading(true);
         try {
            await signIn({ email, password });
            router.replace("/");
        } catch (err: any) {
            if (err.response?.data?.field && err.response?.data?.message) {
                const { field, message } = err.response.data;
                if (field === "email") setErrorEmail(message);
                if (field === "password") setErrorPassword(message);
            } else {
                setErrorEmail("Login fejlede");
                setErrorPassword("Login fejlede");
            }
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
                <Title text="Log ind" style={{ color: "#850E35", fontSize: 30 }} />

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
                    onSubmitEditing={handleLogin}
                    error={errorPassword ?? undefined}
                />

                {generelError && <Text style={styles.error}>{generelError}</Text>}

                <CustomButton
                    title={loading ? "Logger ind..." : "Login"}
                    variant="third"
                    onPress={handleLogin}
                    disabled={loading}
                />

            <View style={styles.registerLink}>
            <Text style={styles.switchText}>Har du ikke en konto?</Text>
            <CustomButton
                title="Opret dig her"
                variant="text"
                onPress={() => router.push("/(auth)/register")}
            />
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#FCF9EA",
  },
  error: { color: "#C0392B", marginBottom: 12, textAlign: "center" },
  registerLink: { marginTop: 16, alignItems: "center" },
  switchText: { color: "#432323", marginBottom: 4 },
});