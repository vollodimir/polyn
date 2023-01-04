import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';
import { FetchProductsParams, FetchProductsType, ProductsSliceState, Status } from './types';

export const fetchProducts = createAsyncThunk<FetchProductsType, FetchProductsParams>(
  'products/fetchProducts',
  async (params) => {
    const {
      page,
      searchRequest = '',
      colors = [],
      sizes = [],
      tags = [],
      catID = [],
      subCatID = [],
      minPrice,
      maxPrice,
      sort,
    } = params;
    console.log('---->', catID);
    const filter =
      (colors[0] ? `&colors=${colors}` : '') +
      (sizes[0] ? `&sizes=${sizes}` : '') +
      (tags[0] ? `&tags=${tags}` : '') +
      (minPrice ? `&minPrice=${minPrice}` : '') +
      (maxPrice ? `&maxPrice=${maxPrice}` : '') +
      (catID[0] ? `&catID=${catID}` : '') +
      (subCatID[0] ? `&subCatID=${subCatID}` : '') +
      (sort ? `&sortBy=${sort}` : '');

    const curentPage = `?page=${page}`;
    const searchValue = searchRequest ? `&search=${searchRequest}` : '';
    const { data } = await axios.get(`/product${curentPage}${searchValue}${filter}`);
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
  parameters: {
    allColors: [],
    allTags: [],
    allSizes: [],
    allCatID: [],
    allSubCatID: [],
    firstPrice: 0,
    lastPrice: 0,
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
      state.parameters = action.payload.parameters;
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
