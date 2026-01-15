import React, { ErrorInfo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router/stack";
import { Drawer } from "expo-router/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { StoriesProvider } from "@/src/context/StoriesContext";
import ErrorScreen from "../src/screens/ErrorScreen";
import ReminderSettingsScreen from "../src/screens/ReminderSettingsScreen";
import StoriesOverviewScreen from "@/src/screens/StoriesOverviewScreen";

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false }; 
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log("Global error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) return <ErrorScreen />;
    return this.props.children;
  }
}


export default function RootLayout() {

  
  return (
    <SafeAreaProvider>
      <StatusBar translucent={false} />
      <StoriesProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </StoriesProvider>
    </SafeAreaProvider>
  );
}
