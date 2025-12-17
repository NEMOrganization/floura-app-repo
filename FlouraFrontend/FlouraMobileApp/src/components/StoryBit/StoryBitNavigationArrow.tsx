import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
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
        <TouchableOpacity style={[styles.arrow, styles.left]} onPress={onPrev} testID="previous-arrow">
          <Feather name="arrow-left" size={size ?? 32} color={"#850E35"} />
        </TouchableOpacity>
      )}

      {/* Right Arrow */}
      {!disableNext && (
        <TouchableOpacity style={[styles.arrow, styles.right]} onPress={onNext} testID="next-arrow">
          <Feather name="arrow-right" size={size ?? 32} color={"#850E35"} />
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

  },
  left: {
    left: 16,
  },
  right: {
    right: 16,
  },
});