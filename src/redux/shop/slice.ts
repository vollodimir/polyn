import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (page: number) => {
  const curentPage = `?page=${page}`;
  const { data } = await axios.get(`/product${curentPage}`);
  return data;
});

// interface ProductsSliceState {
//   searchValue: string;
//   categoryId: number;
//   sort: Sort;
//   curentPage: number;
// }

const initialState = {
  products: [],
  pagination: {
    page: 1,
    limit: 10,
    pages: 1,
    allProducts: 10,
  },
  status: 'loading',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCurentPage(state, action) {
      state.pagination.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = 'loading';
      state.products = [];
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.pagination = action.payload.pagination;
      state.products = action.payload.products;
      state.status = 'success';
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = 'error';
      state.products = [];
    });
  },
});

export const { setCurentPage } = productsSlice.actions;

export const productsReducer = productsSlice.reducer;
