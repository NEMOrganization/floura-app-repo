import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";

import Title from "../components/Title";
import Button from "../components/Button";
import Input from "../components/Input";
import { authService } from "../services/authService";

export default function RegisterScreen() {
    const [ email, setEmail ] = React.useState("");
    const [ password, setPassword ] = React.useState("");
    const [ loading, setLoading ] = React.useState(false);

    const handleRegister = async () => {
        if (!email || !password) {
            Alert.alert("Fejl", "Udfyld alle felter");
            return;
        }

        try {
            setLoading(true);
            await authService.register({ email, password });
            Alert.alert("Succes", "Bruger oprettet. Du kan nu logge ind.");
            router.replace("/(auth)/login");
        } catch (error: any) {
            Alert.alert("Fejl", error.message || "Kunne ikke oprette bruger");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Title text="Opret Bruger" style={styles.title} />

            <Input 
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />

            <Input
                placeholder="Adgangskode"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

               <Button 
                title={loading ? "Opretter..." : "Opret bruger"}
                onPress={handleRegister}
                disabled={loading}
            />
            
            <Button
                title="Har du allerede en konto? Log ind"
                onPress={() => router.replace("/(auth)/login")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#FCF9EA",
  },
    title: {
    fontSize: 24,
    }
});