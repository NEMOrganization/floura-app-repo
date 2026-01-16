import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { router, useNavigation } from 'expo-router';

import { storyService } from '../services/storyService';
import { Story } from '../models/Story';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import StoriesList from '../components/StoriesList';
import LoadingScreen from './LoadingScreen';
import Title from '../components/Title';
import MenuIcon from '../components/MenuIcon';

export default function StoriesOverviewScreen() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const fetchStories = async () => {
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

  const handlePressStory = (story: Story) => {
    router.push({
      pathname: "/(routes)/stories/[storyId]", 
      params: { storyId: story.id }
    });
  }

  const handleToggleDrawer = () => {
    (navigation as any).toggleDrawer?.();
  }

  if (isLoading) return <LoadingScreen />;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style="dark" />


      <MenuIcon 
        onPress={handleToggleDrawer} 
        style={[
          styles.menuIcon, { top: insets.top + 8}
        ]} 
      />

      <Title text={"Flouras\n tandbørsteeventyr"} style={{ color: "#432323", fontSize: 30 }} />

      <StoriesList items={stories} onPressStory={handlePressStory} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 12,
    backgroundColor: '#E3F2EA',
  },
  menuIcon: {
    position: 'absolute',
    top: 12 + 0,
    left: 12,
    zIndex: 10,
  }
});
