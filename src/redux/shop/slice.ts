import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';
import { FetchProductsParams, FetchProductsType, ProductsSliceState, Status } from './types';

export const fetchProducts = createAsyncThunk<FetchProductsType, FetchProductsParams>(
  'products/fetchProducts',
  async (params) => {
    const { page, searchRequest } = params;
    const curentPage = `?page=${page}`;
    const searchValue = `&search=підстилк`;
    const { data } = await axios.get(`/product${curentPage}${searchValue}`);
    return data;
  },
);

export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  const { data } = await axios.get('/category');
  return data;
});

const initialState: ProductsSliceState = {
  products: [],
  pagination: {
    page: 1,
    limit: 6,
    pages: 1,
    allProducts: 10,
  },
  categories: [],
  subCategories: [],
  status: Status.LOADING,
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
    //product
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = Status.LOADING;
      state.products = [];
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.pagination = action.payload.pagination;
      state.products = action.payload.products;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = Status.ERROR;
      state.products = [];
    });
    //categories
    builder.addCase(fetchCategories.pending, (state) => {
      state.status = Status.LOADING;
      state.categories = [];
      state.subCategories = [];
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload.category;
      state.subCategories = action.payload.subCategory;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.status = Status.ERROR;
      state.categories = [];
      state.subCategories = [];
    });
  },
});

export const { setCurentPage } = productsSlice.actions;

export const productsReducer = productsSlice.reducer;
