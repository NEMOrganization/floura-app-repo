import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";

type Props = {
    content: string;
}

export default function StoryBitContent({ content }: Props) {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.text}>{content}</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  textContainer: {
    marginHorizontal: 24,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.57)', // subtle transparency
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    lineHeight: 32,
    color: '#333',
    textAlign: 'center',
    fontFamily: 'Roboto',
  },

});