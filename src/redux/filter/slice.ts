import { createSlice } from '@reduxjs/toolkit';
import { FilterSliseState } from './types';

const initialState: FilterSliseState = {
  searchRequest: '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchRequest(state, action) {
      state.searchRequest = action.payload;
    },
  },
});

export const { setSearchRequest } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
