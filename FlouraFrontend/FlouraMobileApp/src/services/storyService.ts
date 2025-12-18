import { StoryDTO, StoryBitDTO } from "../api/dto/StoryDTO";
import { Story, StoryBit } from "../models/Story";
import { apiClient } from "../api/client";

function mapStoryBit(dto: StoryBitDTO): StoryBit {
    return {
        id: dto.id,
        content: dto.text,
        imageUrl: dto.imageUrl,
        order: dto.order,
    };
}

function mapStory(dto: StoryDTO): Story {
    return {
        id: dto.id,
        title: dto.title,
        summary: dto.summary,
        coverImageUrl: dto.coverImageUrl,
        backgroundImageKey: dto.backgroundImageKey,
        storyBits: dto.storyBits
            .sort((a, b) => a.order - b.order)
            .map(mapStoryBit),
        ageRange: dto.ageRange,
    };
}


export const storyService = {
    getStories: async (): Promise<Story[]> => {
        const stories = await apiClient.get<StoryDTO[]>(`/Stories`);
        return stories.map(mapStory);
    },

    getStoryById: async (id: string): Promise<Story> => {
        const story = await apiClient.get<StoryDTO>(`/Stories/${id}`);
        return mapStory(story);
  },
}