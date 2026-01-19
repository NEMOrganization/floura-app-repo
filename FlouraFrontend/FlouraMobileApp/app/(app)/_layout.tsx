import { Drawer } from "expo-router/drawer";
import { Redirect } from "expo-router";
import { useAuth } from "../../src/context/AuthContext";
import LoadingScreen from "@/src/screens/LoadingScreen";
import React from "react";

export default function AppDrawerLayout() {
    const { token, loading } = useAuth();

    if (loading) {
        return <LoadingScreen />;
    }

    if (!token) {
        return <Redirect href="/(auth)/login" />;
    }

    return (
        <Drawer screenOptions={{ headerShown: false }}>
            <Drawer.Screen name="index" options={{ title: "Flouras eventyr" }} />
            <Drawer.Screen name="reminderSettings" options={{ title: "Påmindelser" }} />
            <Drawer.Screen 
                name="logout"
                options={{
                    drawerLabel: "Log ud", 
                    drawerItemStyle: { height: 50 },
                }}
            />
        </Drawer>
    );
}