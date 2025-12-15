import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';

type Props = {
    onPrev: () => void;
    onNext: () => void;
    disablePrev: boolean;
    disableNext: boolean;
    color?: string;
    size?: number;
}

export default function StoryBitNavigationArrow({ onPrev, onNext, disablePrev, disableNext, color = "black", size = 24 }: Props) {
      return (
    <>
      {/* Left Arrow */}
      {!disablePrev && (
        <TouchableOpacity style={[styles.arrow, styles.left]} onPress={onPrev}>
          <Feather name="arrow-left" size={size} color={color} />
        </TouchableOpacity>
      )}

      {/* Right Arrow */}
      {!disableNext && (
        <TouchableOpacity style={[styles.arrow, styles.right]} onPress={onNext}>
          <Feather name="arrow-right" size={size} color={color} />
        </TouchableOpacity>
      )}
    </>
  );
    
}

const styles = StyleSheet.create({
      arrow: {
    position: "absolute",
    bottom: 40,
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.2)", // optional semi-transparent bg
    borderRadius: 30,
  },
  left: {
    left: 20,
  },
  right: {
    right: 20,
  },
});