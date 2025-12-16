import React, { createContext, useContext, useState} from 'react';
import { Story } from '../models/Story';

type StoriesContextType = {
    stories: Story[];
    upsertStory: (story: Story) => void;
    getStoryById: (id: string) => Story | undefined;
};

type StoriesProviderProps = {
    children: React.ReactNode;
}

const StoriesContext = createContext<StoriesContextType | null>(null);

export function StoriesProvider({children}: StoriesProviderProps) {
    const [stories, setStories] = useState<Story[]>([]);

    function upsertStory(story: Story) {
        setStories((prev) => {
            const exists = prev.find((s) => s.id === story.id);
            if (exists) {
                return prev.map((s) => (s.id === story.id ? story : s));
            }
            return [...prev, story];
        });
    }

    function getStoryById(id: string) {
        return stories.find((s) => s.id === id);
    }
    return (
        <StoriesContext.Provider value={{ stories, upsertStory, getStoryById }}>
            {children}
        </StoriesContext.Provider>
    );
}

export function useStories() {
    const context = useContext(StoriesContext);
    if (!context) {
        throw new Error('useStories must be used within a StoriesProvider');
    }
    return context;
}