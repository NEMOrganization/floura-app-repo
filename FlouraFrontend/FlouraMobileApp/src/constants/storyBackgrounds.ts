import { ImageSourcePropType } from "react-native";

export const DEFAULT_STORY_BACKGROUND: ImageSourcePropType = 
    require("../../assets/images/backgroundImages/default-background.jpg");

export const STORY_BACKGROUNDS: Record<string, ImageSourcePropType> = {
    goodmorningFloura: require("../../assets/images/backgroundImages/goodmorning-background.jpg"),
};