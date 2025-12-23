import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { storyService } from '../services/storyService';
import { Story } from '../models/Story';
import StoriesList from '../components/StoriesList';
import LoadingScreen from '../components/Loading';
import { router } from 'expo-router';
import Title from '../components/Title';

import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function StoriesOverviewScreen() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  //const [error, setError] = useState<string | null>(null);
  const coverKids = require('../../assets/images/coverImages/coverKids.jpg');
  const coverKidsUri = Image.resolveAssetSource(coverKids).uri;

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const data = await storyService.getStories();
        if (!data) {
          throw new Error('Der er ikke nogen historie');
        }

        //setStories(data);
        setStories(data.map((s) => ({ ...s, coverImageUrl: coverKidsUri })));
      } catch {
        router.replace('/errorScreen?message=Historierne er blevet væk');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStories();
  }, []);

  function handlePressStory(story: Story) {
    router.push(`../stories/${story.id}`);
  }
  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <StatusBar style="dark" /> 
      <SafeAreaView style={styles.container} edges={['top']}>
        <Title text="Historie oversigt" />
        <StoriesList items={stories} onPressStory={handlePressStory} />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 12,
    backgroundColor: 'rgba(247, 236, 32, 0.52)',
  },
});
