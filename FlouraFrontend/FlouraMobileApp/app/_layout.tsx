import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StoriesProvider } from "@/src/context/StoriesContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StoriesProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </StoriesProvider>
    </SafeAreaProvider>
  );
}
