import { Image, StyleSheet, ImageSourcePropType } from "react-native";

interface StoryImageProps {
  source: ImageSourcePropType | string; // tillader både require() og URL
  testID?: string;
}

/* export default function StoryImage({ source, testID }: StoryImageProps) {
  return (
    <Image
      testID={testID}
      source={
        typeof source === "string"
          ? { uri: source }
          : source
      }
      style={styles.image}
      resizeMode="contain"
    />
  );
} */

  export default function StoryImage({ source }: StoryImageProps) {
  return (
    <Image
      testID="story-image"
      source={
        typeof source === "string"
          ? { uri: source }
          : source
      }
      style={styles.image}
      resizeMode="contain"
    />
  );
}  

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginVertical: 16,
  },
});
