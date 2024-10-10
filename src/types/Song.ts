// src/types/Song.ts
export interface Song {
    id: string;
    title: string;
    imageUrl: string;
    link: string;
    artist?: string;  // Optional artist field
}
