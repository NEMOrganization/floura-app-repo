/* import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StoriesOverviewScreen from '../src/screens/StoriesOverviewScreen';

export default function Index() {
  return (
    <>
      <StatusBar style="dark" translucent={false} />
      <Stack.Screen options={{ title: '', headerBackVisible: false }} />
      <SafeAreaView edges={['top']} style={styles.safe}></SafeAreaView>
      <StoriesOverviewScreen />
    </>
  );
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  }
});
 */


import StoriesOverviewScreen from "../src/screens/StoriesOverviewScreen";

export default function Index() {
  return <StoriesOverviewScreen />;
}
