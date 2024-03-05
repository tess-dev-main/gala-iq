import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getAlbumAsyncAddress, getUserAlbums, getUsers } from '../constants/Strings';
import { Album, ArchiveAlbumByIdDTO, User, UserState } from '../interfaces';

export const fetchUsers = createAsyncThunk<User[]>('user/fetchUsers', () => {
    return axios.get(getUsers).then(res => res.data);
});

export const fetchUserAlbums = createAsyncThunk<User[], User[]>('user/fetchAlbums', async (users: User[]) => {
    const updatedUsers = await Promise.all(users.map(async (user) => {
        const res: Album[] = [];
        const data: Album[] = await axios.get(getUserAlbums(user.id)).then(res => res.data);

        for (const album of data) {
            try {
                const _albumFromStorage = await AsyncStorage.getItem(getAlbumAsyncAddress(album.id));
                let albumFromStorage: Album | null = null;

                if (!_albumFromStorage) {
                    album.isArchived = false;
                    await AsyncStorage.setItem(getAlbumAsyncAddress(album.id), JSON.stringify(album));
                } else {
                    albumFromStorage = JSON.parse(_albumFromStorage);
                }

                if (albumFromStorage && !albumFromStorage?.isArchived) res.push(albumFromStorage);
            } catch (error) {
                throw error;
            }
        }
        return {...user, albums: res};
    }))

    return updatedUsers;
});

export const archiveAlbumById = createAsyncThunk<ArchiveAlbumByIdDTO, ArchiveAlbumByIdDTO>('photo/archiveAlbumById', async ({ album, UUID }) => {
    const _ALBUM: Album = { ...album, isArchived: true }
    try {
        await AsyncStorage.setItem(getAlbumAsyncAddress(album.id), JSON.stringify(_ALBUM));
        return {
            album: _ALBUM,
            UUID
        };
    } catch (error) {
        throw error;
    }
})

const initialState: UserState = {
    users: [],
    loading: false,
    error: ''
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                if (state.users !== action.payload) state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ? action.error.message : 'Error fetching users, please try again.';
            })
            .addCase(fetchUserAlbums.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchUserAlbums.fulfilled, (state, action) => {
                state.loading = false;
                if (state.users !== action.payload) state.users = action.payload;
            })
            .addCase(fetchUserAlbums.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ? action.error.message : 'Error fetching users, please try again.';
            })
            .addCase(archiveAlbumById.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(archiveAlbumById.fulfilled, (state, action) => {
                const { album, UUID } = action.payload;
                const userToUpdate = state.users.find(u => u.id == UUID);
                if (userToUpdate && userToUpdate.albums) {
                    userToUpdate.albums = userToUpdate.albums?.filter(a => a.id != album.id)
                }
                state.loading = false;
            })
            .addCase(archiveAlbumById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ? action.error.message : 'Error fetching users, please try again.';
            })
    }
});

export default userSlice.reducer;