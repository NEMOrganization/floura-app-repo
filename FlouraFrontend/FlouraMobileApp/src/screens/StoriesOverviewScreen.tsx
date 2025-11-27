import React from "react";
import { View, StyleSheet } from "react-native";

import { Story } from "../models/Story";
import stories from "../mock/stories.json";
import StoriesList from "../components/StoriesList";    

export default function StoriesOverviewScreen() {

    const displayedStories: Story[] = stories;

    return (
        <View style={styles.container}>
            <StoriesList items={displayedStories} />
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
