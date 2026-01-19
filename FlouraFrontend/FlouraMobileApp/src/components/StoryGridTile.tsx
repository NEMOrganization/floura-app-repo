import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Story } from '../models/Story';

import { STORY_COVER, DEFAULT_STORY_COVER_IMAGE, } from '../constants/storyCoverImage';

interface StoryGridItemProps {
  story: Story;
  onPress?: (story: Story) => void;
}
export default function StoryGridTile({ story, onPress }: StoryGridItemProps) {
  const coverImage = 
    STORY_COVER[story.coverImage?.trim() || ''] ?? DEFAULT_STORY_COVER_IMAGE;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress?.(story)}
      activeOpacity={0.8}
    >
    
    <Image source={coverImage} style={styles.image}/>

      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {story.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '48%', // good for 2-column grid
    aspectRatio: 0.8, // keeps the box rectangular
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  image: {
    width: '100%',
    height: '70%',
  },
  titleContainer: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: '30%',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },

  imageFallback: {
    width: '100%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  fallbackText: {
    fontSize: 12,
    opacity: 0.6,
    fontWeight: '600',
  },
});
