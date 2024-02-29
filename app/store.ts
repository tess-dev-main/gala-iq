import { configureStore } from '@reduxjs/toolkit';
import { createLogger }  from 'redux-logger';

import userReducer  from '../features/userSlice'
import photoReducer  from '../features/photoSlice'

const logger = createLogger();

export const store = configureStore({
    reducer: {
        user: userReducer,
        photo: photoReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;