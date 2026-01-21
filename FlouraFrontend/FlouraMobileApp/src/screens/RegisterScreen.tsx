import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";

import Title from "../components/Title";
import Button from "../components/CustomButton";
import Input from "../components/Input";
import { authService } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function RegisterScreen() {
    const [ email, setEmail ] = React.useState("");
    const [ password, setPassword ] = React.useState("");
    const [ loading, setLoading ] = React.useState(false);
    const { signInWithToken } = useAuth();

    const handleRegister = async () => {
        if (!email || !password) {
            Alert.alert("Fejl", "Udfyld alle felter");
            return;
        }

        try {
            setLoading(true);
            const { token } = await authService.register({ email, password });
            await signInWithToken(token);
            Alert.alert("Succes", "Bruger oprettet. Du kan nu logge ind.");
        } catch (error: any) {
            Alert.alert("Fejl", error.message || "Kunne ikke oprette bruger");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Title text="Opret Bruger" style={{ color: "#850E35", fontSize: 30 }} />

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
                variant="third"
                onPress={handleRegister}
                disabled={loading}
            />

            <Button
                title="Tilbage til login"
                variant="text"
                onPress={() => router.back()}
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
});