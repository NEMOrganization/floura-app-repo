import React, { useEffect, useState } from "react";
import { ScrollView, View, Button, StyleSheet, Text } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

import Title from "../components/Title";
import StoryImage from "../components/StoryImage";
import Summary from "../components/Summary";
import { storyService } from "../services/storyService";
import { Story } from "../models/Story";

import { useStories } from "../context/StoriesContext";

export default function StoryDetailScreen() {
  const { storyId } = useLocalSearchParams<{ storyId: string }>();
  const { upsertStory } = useStories();

  const [story, setStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    if (!storyId) return;

    const fetchStory = async () => {
      try {
        const data = await storyService.getStoryById(storyId);
        setStory(data);
        upsertStory(data);
      } catch (err: any) {
        setError(err.message ?? "Failed to load story");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStory();
  }, [storyId, upsertStory]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error || !story) {
    return (
      <View style={styles.center}>
        <Text>{error ?? "Story not found"}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Title text={story.title} />

      <StoryImage
        source={story.coverImageUrl}
        testID="story-image"
      />

      <Summary text={story.summary} />

      <Button
        title="Læs historien"
        onPress={() =>
          router.push(`../stories/${story.id}/bits`)
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});




