import { Story } from "../models/Story";
import { apiClient } from "../api/client";

export const storyService = {
    getStories: async (): Promise<Story[]> => {
        return apiClient.get<Story[]>(`/Stories`);
    }
}