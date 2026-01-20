import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LoadingScreen from './LoadingScreen';
import Title from '../components/Title';
import Summary from '../components/Summary';
import Button from '../components/Button';
import BackHeader from '../components/BackArrow';
import { storyService } from '../services/storyService';
import { Story } from '../models/Story';
import { useStories } from '../context/StoriesContext';
import { useAuth } from '../context/AuthContext';

import { STORY_COVER, DEFAULT_STORY_COVER_IMAGE } from '../constants/storyCoverImage';

export default function StoryDetailScreen() {
  const { storyId } = useLocalSearchParams<{ storyId: string }>();
  const { token, loading: authLoading } = useAuth();
  const { upsertStory } = useStories();
  const insets = useSafeAreaInsets();

  const [story, setStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!storyId || !token || authLoading) return;

    const fetchStory = async () => {
      try {
        const data = await storyService.getStoryById(storyId, token);
        if (!data) throw new Error('Historien findes ikke');
        setStory(data);
        upsertStory(data);
      } catch (error) {
        console.error(error);
        router.replace(`/error?message=${encodeURIComponent('Historien findes ikke')}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStory();
  }, [storyId, token, authLoading, upsertStory]);

  if (isLoading || authLoading) return <LoadingScreen />;
  if (!story) return null;

  const coverImage = STORY_COVER[story.coverImage?.trim() || ''] ?? DEFAULT_STORY_COVER_IMAGE;

  return (
    <View style={styles.screen}>
      <View style={[styles.topSpacer, { paddingTop: Math.max(insets.top - 12, 8) }]} />
      <BackHeader onBack={() => router.back()} />
      <ScrollView contentContainerStyle={[styles.scrollContent]} contentInsetAdjustmentBehavior="never">
        <Title text={story.title} style={styles.title} />
        <Image source={coverImage} style={styles.coverImage} resizeMode="contain" />
        <Summary text={story.summary} style={styles.summary} />
        <View style={styles.buttonContainer}>
          <Button
            title="Læs historien"
            onPress={() => router.push(`/stories/${story.id}/[storyBitId]`)}
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
  topSpacer: {
    // paddingTop styres dynamisk via insets
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    color: '#432323',
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 16,
  },
  coverImage: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginVertical: 16,
  },
  summary: {
    color: '#432323',
    fontSize: 22,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 24,
  },
});

