import React from "react";
import { TouchableOpacity, ViewStyle, StyleProp } from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = {
    onPress: () => void;  
    style?: StyleProp<ViewStyle>  
}

export default function MenuIcon({ onPress, style}: Props) {
    return (
        <TouchableOpacity onPress={onPress} style={style}>
            <Feather name="menu" size={24} color="black" />
        </TouchableOpacity>
    )
}