import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { storyService } from '../services/storyService';
import { Story } from '../models/Story';
import StoriesList from '../components/StoriesList';
import LoadingScreen from '../components/Loading';

export default function StoriesOverviewScreen() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const data = await storyService.getStories();
        setStories(data);
        await new Promise((r) => setTimeout(r, 2000)); // TEMP: kun for at se loading
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching stories.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (isLoading) return <LoadingScreen />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <StoriesList items={stories} />
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
