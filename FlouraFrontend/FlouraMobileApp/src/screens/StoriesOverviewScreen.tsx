import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { storyService } from '../services/storyService';
import { Story } from '../models/Story';
import StoriesList from '../components/StoriesList';
import LoadingScreen from '../components/Loading';
import { router } from 'expo-router';

export default function StoriesOverviewScreen() {
    const [stories, setStories] = useState<Story[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    //const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const data = await storyService.getStories();
                if (!data) {
                throw new Error("Der er ikke nogen historie");
                }

                setStories(data);   
            } catch {
                router.replace(
                "/errorScreen?message=Historierne er blevet væk"
             );
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
    <View style={styles.container}>
      <StoriesList items={stories} onPressStory={handlePressStory} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f5f5f5',
  },
});
