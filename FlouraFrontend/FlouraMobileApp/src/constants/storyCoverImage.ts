import { ImageSourcePropType } from "react-native";

export const DEFAULT_STORY_COVER_IMAGE: ImageSourcePropType = 
    require("../../assets/images/coverImages/coverKids.jpg");

export const STORY_COVER: Record<string, ImageSourcePropType> = {
    morningFloura: require("../../assets/images/coverImages/FlouraMorgenCover.jpg"),
    nightFloura: require("../../assets/images/coverImages/FlouraNightCover.jpg"), 
};