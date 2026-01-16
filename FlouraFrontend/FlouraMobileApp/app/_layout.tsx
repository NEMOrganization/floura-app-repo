import React from "react";
import { AuthProvider } from "../src/context/AuthContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </AuthProvider>
  );  
}