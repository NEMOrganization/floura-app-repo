import React, { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet} from "react-native";
import { useAuth } from "../context/AuthContext";
import { router } from "expo-router";

export default function LoginScreen() {
    const { signIn } = useAuth();
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState<string | null>(null);

    const handleLogin = async () => {
        setError(null);
        try {
            await signIn({ email, password });
        } catch (err: any) {
            setError(err.message || "Login fejlede");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput 
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput 
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
            {error && <Text>{error}</Text>}
            <Button 
                title="Opret Bruger"
                onPress={() => router.replace("/(auth)/register")}
            />

        </View>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 12, borderRadius: 6 },
  error: { color: "red", marginTop: 10 },
});