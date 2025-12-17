import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useStories } from "../context/StoriesContext";

import StoryBitHeader from "../components/StoryBit/StoryBitHeader";
import StoryBitNavigationArrow from "../components/StoryBit/StoryBitNavigationArrow";
import StoryBitContent from "../components/StoryBit/StoryBitContent";

export default function StoryBitScreen() {
      const { storyId } = useLocalSearchParams<{ storyId: string }>();
      const { getStoryById } = useStories();
      const story = getStoryById(storyId);
      
      const router = useRouter();
      const [currentIndex, setCurrentIndex] = useState(0);

      if (!story) {
        return (
            <View style={styles.center}>
                <Text>Story not found</Text>
            </View>
        )
      }

      const currentBit = story.storyBits[currentIndex];

      const handleNext = () => setCurrentIndex((i) => i + 1);
      const handlePrev = () => setCurrentIndex((i) => i - 1);
      const handleBack = () => router.back();

      return (
        <View style={styles.container}>
            <StoryBitHeader
                currentIndex={currentIndex}
                totalBits={story.storyBits.length}
                onBack={handleBack}
            />

            <StoryBitContent content={currentBit.content} />

            <StoryBitNavigationArrow
                onPrev={handlePrev}
                onNext={handleNext}
                disablePrev={currentIndex === 0}
                disableNext={currentIndex === story.storyBits.length - 1}
                color="#ddb52f"
            />
        </View>
  );

    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
