import React, { useEffect, useState } from 'react';
import {
  Text,
  ScrollView,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import LoadingScreen from '../components/Loading';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Title from '../components/Title';
import StoryImage from '../components/StoryImage';
import Summary from '../components/Summary';
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
      try {
        const data = await storyService.getStoryById(storyId);
        if (!data) {
          throw new Error('Historien findes ikke');
        }
        setStory(data);
        upsertStory(data);
      } catch {
        //router.replace("/errorScreen?message=Historien gemmer sig");
        router.push('/errorScreen?message=Historien gemmer sig');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStory();
  }, [storyId, upsertStory]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!story) return null;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom + 16,
        },
      ]}
      contentInsetAdjustmentBehavior="never"
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ marginBottom: 12 }}
      >
        <Text style={{ fontSize: 16, color: '#007AFF' }}>← Tilbage</Text>
      </TouchableOpacity>
      <Title text={story.title} />
      <StoryImage source={story.coverImageUrl} testID="story-image" />
      <Summary text={story.summary} />

      <Button
        title="Læs historien"
        onPress={() => router.push(`../stories/${story.id}/bits`)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
