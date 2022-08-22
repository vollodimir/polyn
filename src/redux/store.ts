import { configureStore } from '@reduxjs/toolkit';

import { useDispatch } from 'react-redux';
import { authReducer } from './auth/slise';
import { postsReducer } from './posts/slice';
import { productsReducer } from './shop/slice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    products: productsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
