import React from "react";
import { Stack } from "expo-router";

export default function StoriesStackLayout() {
    return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="index" /> */}
      <Stack.Screen name="[storyId]" /> 
      <Stack.Screen name="[storyId]/[storyBitId]" />
    </Stack>
  );
}