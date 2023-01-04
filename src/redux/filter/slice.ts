import { createSlice } from '@reduxjs/toolkit';
import { FilterSliseState } from './types';

const initialState: FilterSliseState = {
  searchRequest: '',
  filters: {
    colors: [],
    tags: [],
    sizes: [],
    catID: [],
    subCatID: [],
    minPrice: 0,
    maxPrice: 0,
    sort: '',
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchRequest(state, action) {
      state.searchRequest = action.payload;
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
    setSort(state, action) {
      state.filters.sort = action.payload;
    },
    setCatID(state, action) {
      state.filters.catID = action.payload;
    },
  },
});

export const { setSearchRequest, setFilters, setSort, setCatID } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
