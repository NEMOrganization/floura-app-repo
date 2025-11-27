export interface Story {
    id: string;
    title: string;
    summary: string;
    coverImageUrl: string;
    storyBits: StoryBit[];
    ageRange: string;
}

export interface StoryBit {
    id: string;
    content: string;
    imageUrl?: string;
    order: number;
}