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

export interface Album {
    userId: number;
    id: number;
    title: string;
}

export interface FetchAlbumsResponse {
    userId: number;
    albums: Album[];
}