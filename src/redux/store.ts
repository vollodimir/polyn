import { configureStore } from '@reduxjs/toolkit';

import { useDispatch } from 'react-redux';
import { authReducer } from './auth/slice';
import { filterReducer } from './filter/slice';
import { postsReducer } from './posts/slice';
import { productsReducer } from './shop/slice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    products: productsReducer,
    auth: authReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
