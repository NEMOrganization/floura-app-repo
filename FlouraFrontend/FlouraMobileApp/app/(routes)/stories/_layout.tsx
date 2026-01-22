import React from "react";
import { Stack } from "expo-router";

export default function StoriesStackLayout() {
    return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Stories Overview" }} />
      <Stack.Screen name="[storyId]" options={{ title: "Story Details" }} />
      <Stack.Screen name="[storyId]/[storyBitId]" options={{ title: "Story Bit Details" }} />
    </Stack>
  );
}