export interface StringWithId {
    (id: number): string;
} 

export const getUsers: string = "https://jsonplaceholder.typicode.com/users";
export const getPhotos: string = "https://jsonplaceholder.typicode.com/photos";
export const getUserAlbums: StringWithId = (userId) => `https://jsonplaceholder.typicode.com/albums?userId=${userId}`;
export const getAlbumById: StringWithId = (albumId) => `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`;
export const BLUR_HASH: string = "UKO2:N%2Tw=w]~RBVZRi};RPxuwHtLOtxZ%g";
export const getAlbumAsyncAddress: StringWithId = (albumId) => `album_${albumId}`;