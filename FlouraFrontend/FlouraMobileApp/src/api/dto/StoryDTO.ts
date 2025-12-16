export interface StoryBitDTO {
    id: string;
    text: string;
    imageUrl?: string;
    order: number;
}

export interface StoryDTO {
    id: string;
    title: string;
    summary: string;
    coverImageUrl: string;
    storyBits: StoryBitDTO[];
    ageRange: string;
}