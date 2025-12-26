import React, { useState } from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useStories } from '../context/StoriesContext';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import StoryBitHeader from '../components/StoryBit/StoryBitHeader';
import StoryBitNavigationArrow from '../components/StoryBit/StoryBitNavigationArrow';
import StoryBitContent from '../components/StoryBit/StoryBitContent';

import {
  STORY_BACKGROUNDS,
  DEFAULT_STORY_BACKGROUND,
} from '../constants/storyBackgrounds';

export default function StoryBitScreen() {
  const { storyId } = useLocalSearchParams<{ storyId: string }>();
  const { getStoryById } = useStories();
  const story = getStoryById(storyId);
  const insets = useSafeAreaInsets();

  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const backgroundImages =
    STORY_BACKGROUNDS[story?.backgroundImageKey ?? ''] ??
    DEFAULT_STORY_BACKGROUND;

  if (!story) {
    return (
      <View style={styles.center}>
        <Text>Story not found</Text>
      </View>
    );
  }

  const currentBit = story.storyBits[currentIndex];

  const handleNext = () => setCurrentIndex((i) => i + 1);
  const handlePrev = () => setCurrentIndex((i) => i - 1);
  const handleBack = () => router.back();

  return (
    <ImageBackground
      source={backgroundImages}
      style={styles.background}
      resizeMode="cover"
      testID="story-background"
    >
      <View style={styles.overlay}>
        <StatusBar style="dark" translucent />

        <View style={{ paddingTop: Math.max(insets.top - 12, 8) }}></View>
        <StoryBitHeader
          currentIndex={currentIndex}
          totalBits={story.storyBits.length}
          onBack={handleBack}
        />
        <View style={styles.contentContainer}>
          <StoryBitContent content={currentBit.content} />
        </View>
        <View style={{ paddingBottom: insets.bottom + 8 }}></View>
        <StoryBitNavigationArrow
          onPrev={handlePrev}
          onNext={handleNext}
          disablePrev={currentIndex === 0}
          disableNext={currentIndex === story.storyBits.length - 1}
          size={32}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    paddingVertical: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
});
