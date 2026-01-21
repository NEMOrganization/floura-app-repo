import React, { useState } from "react";
import { Text, View, StyleSheet} from "react-native";
import { useAuth } from "../context/AuthContext";
import { router } from "expo-router";

import Title from "../components/Title";
import Input from "../components/Input";
import Button from "../components/CustomButton";

export default function LoginScreen() {
    const { signIn } = useAuth();
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState<string | null>(null);
    const [ loading ] = React.useState(false);

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

            <Title text="Log ind" style={{ color: "#850E35", fontSize: 30 }}/>

            <Input 
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Input 
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {error && <Text style={styles.error}>{error}</Text>}

            <Button 
                title={loading ? "Logger ind..." : "Login"} 
                variant="third"
                onPress={handleLogin}
                disabled={loading} 
            />

            <View style={styles.registerLink}>
                <Text style={styles.switchText}>Har du ikke en konto?</Text>
                <Button 
                    title="Opret dig her"
                    variant="text"
                    onPress={() => router.push("/(auth)/register")}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#FCF9EA",
  },
  error: {
    color: "#C0392B",
    marginBottom: 12,
    textAlign: "center",
  },
  registerLink: {
    marginTop: 16,
    alignItems: "center",
  },
  switchText: {
    color: "#432323",
    marginBottom: 4,
  },
});