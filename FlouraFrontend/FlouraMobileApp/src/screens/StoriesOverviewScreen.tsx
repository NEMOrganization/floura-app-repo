import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Button } from 'react-native';
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

  useEffect(() => {
    const fetchStories = async () => {
      // ✅ Gør assets “testsikre”: i Jest kan require/resolveAssetSource crashe
      let coverKidsUri = '';
      try {
        const coverKids = require('../../assets/images/coverImages/coverKids.jpg');
        coverKidsUri = Image.resolveAssetSource(coverKids)?.uri ?? '';
      } catch {
        coverKidsUri = '';
      }

      try {
        const data = await storyService.getStories();
        if (!data) {
          throw new Error('Der er ikke nogen historie');
        }

        setStories(data.map((s) => ({ ...s, coverImageUrl: coverKidsUri })));
      } catch {
        router.replace('/errorScreen?message=Internettet er vist forsvundet');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStories();
  }, []);

  function handlePressStory(story: Story) {
    router.push(`../stories/${story.id}`);
  }

  function handlePressReminder(){
    router.push('/reminderSettingsScreen');
  }

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container} edges={['top']}>
        <Title text="Historie oversigt" />

        <Button 
          title="Opsæt påmindelser"
          onPress={handlePressReminder}
        />

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
    backgroundColor: '#E3F2EA',
  },
});
