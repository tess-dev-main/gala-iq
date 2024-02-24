export interface UrlGenerator {
    (id: number): string;
} 

export const getUsers: string = "https://jsonplaceholder.typicode.com/users";
export const getPhotos: string = "https://jsonplaceholder.typicode.com/photos";
export const getUserAlbums: UrlGenerator = (userId) => `https://jsonplaceholder.typicode.com/albums?userId=${userId}`;
export const getAlbumById: UrlGenerator = (albumId) => `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`;
