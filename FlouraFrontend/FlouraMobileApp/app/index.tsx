import { Stack } from "expo-router";
import StoriesOverviewScreen from "../src/screens/StoriesOverviewScreen";

export default function Index() {
  return (
    <>
      <Stack.Screen options={{ title: "", headerBackVisible: false }} />
      <StoriesOverviewScreen />
    </>
  );
}
