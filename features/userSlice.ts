import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { getUserAlbums, getUsers } from '../constants/Strings';
import { Album, FetchAlbumsResponse, User, UserState } from '../interfaces';
import { useAppDispatch } from "@/hooks";

export const fetchUsers = createAsyncThunk<User[]>('user/fetchUsers', () => {
    return axios.get(getUsers).then(res => res.data);
});

export const fetchUserAlbums = createAsyncThunk<User[], User[]>('user/fetchAlbums', async (users: User[]) => {
    const updatedUsers = await Promise.all(users.map(async (user) => {
        const albums: Album[] = await axios.get(getUserAlbums(user.id)).then(res => res.data);
        return {...user, albums};
    }))

    return updatedUsers;
});

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
                state.users = action.payload;
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
                state.users = action.payload;
            })
            .addCase(fetchUserAlbums.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ? action.error.message : 'Error fetching users, please try again.';
            })
    }
});

export default userSlice.reducer;