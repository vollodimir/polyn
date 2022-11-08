import { createSlice } from '@reduxjs/toolkit';
import { FilterSliseState } from './types';

const initialState: FilterSliseState = {
  searchRequest: '',
  filters: {
    colors: [],
    tags: [],
    sizes: [],
    minPrice: 0,
    maxPrice: 0,
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
  },
});

export const { setSearchRequest, setFilters } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
