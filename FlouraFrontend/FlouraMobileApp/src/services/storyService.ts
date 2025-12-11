import { Story } from "../models/Story";

const BASE_URL_STORIES = 'https://floura-api-asfmcdd6fdfkd4df.westeurope-01.azurewebsites.net/api/Stories';

export const storyService = {
    getStories: async (): Promise<Story[]> => {
        const response = await fetch(BASE_URL_STORIES);
        if (!response.ok) {
            throw new Error('Failed to fetch stories');
        }
        const data: Story[] = await response.json();
        return data;
    }
}