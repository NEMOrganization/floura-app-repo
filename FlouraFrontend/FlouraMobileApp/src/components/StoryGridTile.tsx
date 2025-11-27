import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Story } from '../models/Story';

interface StoryGridItemProps {
    story: Story;
    onPress?: (story: Story) => void;
}

export default function StoryGridTile({story, onPress}: StoryGridItemProps) {
    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={() => onPress?.(story)}
            activeOpacity={0.8}
        >
            <Image source={{uri: story.coverImageUrl}} style={styles.image} />

            <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={2}>
                    {story.title}
                </Text>
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
 container: {
    width: "48%",                  // good for 2-column grid
    aspectRatio: 0.8,              // keeps the box rectangular
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,                   // Android shadow
    shadowColor: "#000",           // iOS shadow
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  image: {
    width: "100%",
    height: "70%",
  },
  titleContainer: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    height: "30%",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});