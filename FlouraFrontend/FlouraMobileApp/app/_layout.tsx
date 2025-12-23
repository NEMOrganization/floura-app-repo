import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StoriesProvider } from "@/src/context/StoriesContext";
import { StatusBar } from "expo-status-bar";

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
