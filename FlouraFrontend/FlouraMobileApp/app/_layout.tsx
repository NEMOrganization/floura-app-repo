import React from "react";
import { AppProviders } from "../src/providers/AppProviders";
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAuth } from "../src/context/AuthContext";
import LoadingScreen from "../src/screens/LoadingScreen";
import AppDrawerLayout from "./(app)/_layout";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppProviders>
        <RootSlot />
      </AppProviders>
    </SafeAreaProvider>
  );
}

function RootSlot() {
  const { token, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  if (!token) {
    return <Slot />; 
  }

  return <AppDrawerLayout />;
}
