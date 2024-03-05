import { Album } from "./Photo";

export interface GeoLocation {
    lat: string;
    lng: string;
}

export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: GeoLocation;
}

export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
    albums?: Album[];
}

export interface UserState {
    users: User[];
    loading: boolean;
    error: string;
}

export interface ArchiveAlbumByIdDTO {
    album: Album,
    UUID: number
}