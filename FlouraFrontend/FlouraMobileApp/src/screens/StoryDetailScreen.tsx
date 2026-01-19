import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
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

import {
  STORY_COVER,
  DEFAULT_STORY_COVER_IMAGE,
} from '../constants/storyCoverImage';

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
        router.push('/error?message=Historien gemmer sig');
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

  const coverImage =
    STORY_COVER[story.coverImage?.trim() || ''] ?? DEFAULT_STORY_COVER_IMAGE;

  return (
    <View style={styles.screen}>
      <View style={{ paddingTop: Math.max(insets.top - 12, 8) }} />
      <BackHeader onBack={() => router.back()} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 16,
        }}
        contentInsetAdjustmentBehavior="never"
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginBottom: 12 }}
        ></TouchableOpacity>

        <Title
          text={story.title}
          style={{ color: '#432323', fontSize: 26, textAlign: 'center' }}
        />

        <Image
          source={coverImage}
          style={{
            width: '100%',
            height: 250,
            borderRadius: 12,
            marginVertical: 16,
          }}
          resizeMode="contain"
        />

        <Summary
          text={story.summary}
          style={{ color: '#432323', fontSize: 22, textAlign: 'center' }}
        />

        <View>
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
