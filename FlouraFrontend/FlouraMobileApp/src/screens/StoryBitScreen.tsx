import React, { useState } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useStories } from "../context/StoriesContext";

export default function StoryBitScreen() {
      const { storyId } = useLocalSearchParams<{ storyId: string }>();
      const { getStoryById } = useStories();
      
      const story = getStoryById(storyId);
      const [currentIndex, setCurrentIndex] = useState(0);

      if (!story) {
        return (
            <View style={styles.center}>
                <Text>Story not found</Text>
            </View>
        )
      }

      const currentBit = story.storyBits[currentIndex];

      return (
        <View style={styles.container}>
            {/* StoryBit text */}
            <View>
                <Text>{currentBit.content}</Text>
            </View>
            {/* Navigation buttons */}
            <View>
                <Button 
                title="tilbage"
                disabled={currentIndex === 0}
                onPress={() => setCurrentIndex((i) => i - 1)}
                />
                <Text>
                    {currentIndex + 1} / {story.storyBits.length}
                </Text>
                <Button 
                title="frem"
                disabled={currentIndex === story.storyBits.length - 1}
                onPress={() => setCurrentIndex((i) => i + 1)}
                />
            </View>
        </View>
      )

    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    lineHeight: 26,
    color: "#333",
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
