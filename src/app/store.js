import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import filtersReducer from '../features/filters/filtersSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    filters: filtersReducer,
    user: userReducer,
  },
});