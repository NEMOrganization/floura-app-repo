import React, { useEffect, useState } from "react";
import { ScrollView, View, Button, StyleSheet, Text } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

import Title from "../components/Title";
import StoryImage from "../components/StoryImage";
import Summary from "../components/Summary";
import { storyService } from "../services/storyService";
import { Story } from "../models/Story";

export default function StoryDetailScreen() {
  const { storyId } = useLocalSearchParams<{ storyId: string }>();

  const [story, setStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!storyId) return;

    const fetchStory = async () => {
      try {
        const data = await storyService.getStoryById(storyId);
        if (!data) {
        throw new Error("Historien findes ikke");
      }
        setStory(data);

      } catch {
        router.replace("/errorScreen?message=Vi kunne ikke finde den historie"); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchStory();
  }, [storyId]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if(!story) return null;

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




