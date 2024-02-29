import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '../app/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
    // Includes Thunk middleware types not found in default Dispatch.
export const useAppDispatch: () => AppDispatch = useDispatch;
    // Saves you the need to type (state: RootState) every time.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;