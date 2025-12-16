import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";

type Props = {
    content: string;
}

export default function StoryBitContent({ content }: Props) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.text}>{content}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  text: {
    fontSize: 18,
    lineHeight: 28,
    color: "#333",
    textAlign: "center",
  },
});