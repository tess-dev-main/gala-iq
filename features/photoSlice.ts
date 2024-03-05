import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { getPhotos, getAlbumById } from '../constants/Strings';
import { Photo, PhotoState } from '../interfaces';

export const fetchPhotos = createAsyncThunk<Photo[]>('photo/fetchPhotos', () => {
    return axios.get(getPhotos).then(res => res.data)
});

export const fetchPhotosPaginated = createAsyncThunk<Photo[], number>(
    'photo/fetchPhotosPaginated',
    async (page: number) => {
      try {
        const response = await axios.get(`${getPhotos}?_start=${(page - 1)}&_limit=25`);
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );

export const fetchAlbumById = createAsyncThunk<Photo[], number>(
    'photo/fetchAlbumById', async (id: number) => {
        try {
            const response = await axios.get(getAlbumById(id));
            return response.data;
        } catch(error) {
            throw error;
        }
    }
);

const initialState: PhotoState = {
    photos: [],
    loading: false,
    error: ''
};

const photoSlice = createSlice({
    name: 'photo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPhotos.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchPhotos.fulfilled, (state, action) => {
                state.loading = false;
                state.photos = action.payload;
            })
            .addCase(fetchPhotos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ? action.error.message : 'Error fetching photos, please try again.';
            })
            .addCase(fetchPhotosPaginated.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchPhotosPaginated.fulfilled, (state, action) => {
                state.loading = false;
                state.photos = [...state.photos, ...action.payload];
            })
            .addCase(fetchPhotosPaginated.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ? action.error.message : 'Error fetching paginated photos, please try again.';
            })
            .addCase(fetchAlbumById.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchAlbumById.fulfilled, (state, action) => {
                state.loading = false;
                state.photos = action.payload;
            })
            .addCase(fetchAlbumById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ? action.error.message : 'Error fetching paginated photos, please try again.';
            })
    }
});

export default photoSlice.reducer;