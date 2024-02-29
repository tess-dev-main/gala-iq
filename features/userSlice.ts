import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { getUsers } from '../constants/Strings';
import { User, UserState } from '../interfaces';

export const fetchUsers = createAsyncThunk<User[]>('user/fetchUsers', () => {
    return axios.get(getUsers).then(res => res.data)
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
    }
});

export default userSlice.reducer;