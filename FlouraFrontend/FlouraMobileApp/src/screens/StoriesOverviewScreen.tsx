import React, { useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';

import { storyService } from '../services/storyService';
import { Story } from '../models/Story';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import StoriesList from '../components/StoriesList';
import LoadingScreen from './LoadingScreen';
import Title from '../components/Title';
import Button from '../components/Button';



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
        router.replace('/error?message=Internettet er vist forsvundet');
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
    router.push('/reminderSettings');
  }

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container} edges={['top']}>
        <Title text={"Flouras\n tandbørsteeventyr"} style={{ color: '#432323', fontSize: 30}} />

        <Button 
        title="Opsæt påmindelser"
        onPress={handlePressReminder}
        variant="third" 
        style={{ marginVertical: 20 }} 
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
