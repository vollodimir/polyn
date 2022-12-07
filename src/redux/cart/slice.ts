import { createSlice } from '@reduxjs/toolkit';
import { CartSliseState } from './types';

const initialState: CartSliseState = {
  userId: '',
  totalPrice: 0,
  products: [],
};

const filterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartAdd(state, action) {
      state.products = action.payload;
    },
  },
});

export const { setCartAdd } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
