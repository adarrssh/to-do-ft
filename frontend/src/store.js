import { configureStore } from '@reduxjs/toolkit';
import noteReducer from '../src/features/noteSlice'


export const store = configureStore({
  reducer: {
    note: noteReducer,
  },
});
