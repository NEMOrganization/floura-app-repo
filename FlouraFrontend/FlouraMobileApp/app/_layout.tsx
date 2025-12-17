import { Stack } from "expo-router";
import { StoriesProvider } from "@/src/context/StoriesContext";

export default function RootLayout() {
  return (
    <StoriesProvider>
      <Stack 
        screenOptions={{
          headerShown: true,
          title: "",
        }}
      />
    </StoriesProvider>
  );
}
