import React from "react";
import { AppProviders } from "../src/providers/AppProviders";
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppProviders>
        <Slot />
      </AppProviders>
    </SafeAreaProvider>

  );  
}