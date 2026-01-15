import React from "react";
import { AuthProvider, useAuth } from "../src/context/AuthContext";
import AppDrawerLayout from "./(app)/_layout";
import AuthLayout from "./(auth)/_layout";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </AuthProvider>
  );  
}

function RootNavigator() {
  const { token } = useAuth();

  return token ? <AppDrawerLayout /> : <AuthLayout />;
}
