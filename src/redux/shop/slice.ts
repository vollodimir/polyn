import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const { data } = await axios.get('/product');
  return data;
});

const initialState = {
  products: {
    items: [],
    page: 1,
    limit: 10,
    allProducts: 10,
    status: 'loading',
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.products.status = 'loading';
      state.products.items = [];
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products.items = action.payload.products;
      state.products.page = action.payload.page;
      state.products.limit = action.payload.limit;
      state.products.allProducts = action.payload.allProducts;
      state.products.status = 'success';
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.products.status = 'error';
      state.products.items = [];
    });
  },
});

export const productsReducer = productsSlice.reducer;
