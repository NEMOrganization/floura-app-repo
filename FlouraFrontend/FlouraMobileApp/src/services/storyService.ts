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
        coverImage: dto.coverImage,
        backgroundImageKey: dto.backgroundImageKey,
        storyBits: dto.storyBits
            .sort((a, b) => a.order - b.order)
            .map(mapStoryBit),
        ageRange: dto.ageRange,
    };
}

export const storyService = {
  getStories: async (token: string): Promise<Story[]> => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    console.log('StoryService headers:', headers);

    const stories = await apiClient.get<StoryDTO[]>('/Stories', headers);
    
    return stories.map(mapStory);
  },

  getStoryById: async (id: string, token: string): Promise<Story> => {
    const story = await apiClient.get<StoryDTO>(`/Stories/${id}`, {
      Authorization: `Bearer ${token}`,
    });
    return mapStory(story);
  },
};
