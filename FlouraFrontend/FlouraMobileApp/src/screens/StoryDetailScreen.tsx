import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LoadingScreen from '../components/Loading';
import Title from '../components/Title';
import StoryImage from '../components/StoryImage';
import Summary from '../components/Summary';
import Button from '../components/Button';
import BackHeader from '../components/BackArrow';

import { storyService } from '../services/storyService';
import { Story } from '../models/Story';
import { useStories } from '../context/StoriesContext';

export default function StoryDetailScreen() {
  const { storyId } = useLocalSearchParams<{ storyId: string }>();
  const { upsertStory } = useStories();
  const insets = useSafeAreaInsets();

  const [story, setStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!storyId) {
      setIsLoading(false);
      return;
    }

    const fetchStory = async () => {
      let coverKidsUri = '';
      try {
        const coverKids = require('../../assets/images/coverImages/coverKids.jpg');
        coverKidsUri = Image.resolveAssetSource(coverKids)?.uri ?? '';
      } catch {
        coverKidsUri = '';
      }

      try {
        const data = await storyService.getStoryById(storyId);
        if (!data) throw new Error('Historien findes ikke');

        const storyWithCover: Story = {
          ...data,
          coverImageUrl: coverKidsUri,
        };

        setStory(storyWithCover);
        upsertStory(storyWithCover);
      } catch {
        router.push('/errorScreen?message=Historien gemmer sig');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStory();
  }, [storyId, upsertStory]);

  if (isLoading) return <LoadingScreen />;
  if (!story) return null;

  return (
    <View style={styles.screen}>
      {/* samme top spacer som StoryBitScreen */}
      <View style={{ paddingTop: Math.max(insets.top - 12, 8) }} />

      {/* header med pil (uden progress) */}
      <BackHeader onBack={() => router.back()} />

      {/* scrollbart indhold */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 16,
        }}
        contentInsetAdjustmentBehavior="never"
      >
        <Title text={story.title} style={{ color: '#432323', fontSize: 26 }} />

        <StoryImage source={{ uri: story.coverImageUrl }} />

        <Summary
          text={story.summary}
          style={{ color: '#432323', fontSize: 22, textAlign: 'center' }}
        />

        <View style={{ marginTop: 12 }}>
          <Button
            title="Læs historien"
            onPress={() => router.push(`../stories/${story.id}/bits`)}
            variant="third"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FCF9EA',
  },
});
