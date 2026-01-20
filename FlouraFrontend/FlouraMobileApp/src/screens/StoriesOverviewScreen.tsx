import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';

import { storyService } from '../services/storyService';
import { Story } from '../models/Story';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../context/AuthContext';

import StoriesList from '../components/StoriesList';
import LoadingScreen from './LoadingScreen';
import Title from '../components/Title';
import MenuIcon from '../components/MenuIcon';

export default function StoriesOverviewScreen() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { token, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!token) {
      console.log('Ingen token, sender til login');
      router.replace('/(auth)/login');
      return;
    }

    console.log('Sender token til API:', token.trim());

    const fetchStories = async () => {
    try {
      const data = await storyService.getStories(token); 
      setStories(data);
    } catch (error) {
      console.error("Error fetching stories:", error);
      router.replace('/error?message=Der er sket en fejl ved hentning af historier');
    } finally {
      setIsLoading(false);
    }
  };

  fetchStories();
}, [loading, token, router]);

  const handlePressStory = (story: Story) => {
    router.push(`/stories/${story.id}`);
  };


  const handleToggleDrawer = () => {
    (navigation as any).toggleDrawer?.();
  }

  if (isLoading) return <LoadingScreen />;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style="dark" />


      <MenuIcon 
        onPress={handleToggleDrawer} 
        style={[
          styles.menuIcon, { top: insets.top + 8}
        ]} 
      />

      <Title text={"Flouras\n tandbørsteeventyr"} style={{ color: "#432323", fontSize: 30 }} />

      <StoriesList items={stories} onPressStory={handlePressStory} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 12,
    backgroundColor: '#E3F2EA',
  },
  menuIcon: {
    position: 'absolute',
    top: 12 + 0,
    left: 12,
    zIndex: 10,
  }
});
