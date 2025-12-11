import { View, ScrollView, Button } from "react-native";
import Title from "../components/Title";
import StoryImage from "../components/StoryImage";
import Summary from "../components/Summary";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


interface Story {
  id: string;
  title: string;
  summary: string;
  coverImageUrl: string;
  storyBits: {
    id: string;
    content: string;
    imageUrl: string;
    order: number;
  }[];
  ageRange: string;
}

interface StoryDetailScreenProps {
  story: Story;
}

type RootStackParamList = {
  StoryDetailScreen: { storyId: string };
  StoryBitsScreen: { storyId: string };
};

type StoryDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "StoryDetailScreen"
>;

export default function StoryDetailScreen({ story }: StoryDetailScreenProps) {
  const navigation = useNavigation<StoryDetailScreenNavigationProp>();
  return (
    <ScrollView style={{ padding: 16 }}>
      <Title text={story.title} />

      <StoryImage
        source={story.coverImageUrl}
        testID="story-image"
      />

      <Summary text={story.summary} />

      <Button
        title="Læs historien"
        onPress={() =>
          navigation.navigate("StoryBitsScreen", { storyId: story.id })
        }
      />
    </ScrollView>
  );
}

