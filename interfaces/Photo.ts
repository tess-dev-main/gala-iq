export interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

export interface PhotoState {
    photos: Photo[];
    loading: boolean;
    error: string;
}