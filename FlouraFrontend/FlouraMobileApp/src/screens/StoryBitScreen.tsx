import React, { useState } from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useStories } from "../context/StoriesContext";

import StoryBitHeader from "../components/StoryBit/StoryBitHeader";
import StoryBitNavigationArrow from "../components/StoryBit/StoryBitNavigationArrow";
import StoryBitContent from "../components/StoryBit/StoryBitContent";

const StoryBackgrounds: { [key: string]: any } = {
  goodmorningFloura: require("../../assets/images/backgroundImages/goodmorning-background.jpg")
}

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

      const backgroundImage = StoryBackgrounds[story.id] || require("../../assets/images/backgroundImages/default-background.jpg");

      return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <View style={styles.overlay}>
              <StoryBitHeader
                currentIndex={currentIndex}
                totalBits={story.storyBits.length}
                onBack={handleBack}
              />
              <View style={styles.contentContainer}>
                <StoryBitContent content={currentBit.content} />
              </View>

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
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    paddingVertical: 16,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 24,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
