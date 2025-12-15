import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { router } from "expo-router";
import { storyService } from "../services/storyService";
import { Story } from "../models/Story";
import StoriesList from "../components/StoriesList";    

export default function StoriesOverviewScreen() {
    const [stories, setStories] = useState<Story[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    //const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const data = await storyService.getStories();
                if (!data) {
                throw new Error("Hov.. Der er ikke nogen historie.");
                }

                setStories(data);   
            } catch {
                router.replace(
                "/errorScreen?message=Historierne er vist blevet væk"
             );
            } finally {
                setIsLoading(false);
            }
        };

        fetchStories();
    }, []);

    function handlePressStory(story: Story) {
        router.push(`/stories/${story.id}`);
    } 

    if (isLoading) return <Text>Loading...</Text>; // should be replaced with loading screen, and this comment should be removed

    return (
        <View style={styles.container}>
            <StoriesList items={stories} 
             onPressStory={handlePressStory} />
        </View>
    );
}
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        backgroundColor: "#f5f5f5",
    },
});
