import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';
import { ShopItemProps } from '../../components/ShopItem';

export const fetchProductAdd = createAsyncThunk(
  'product/fetchProductAdd',
  async (params: ShopItemProps) => {
    const { data } = await axios.post('/product', params);
    return data;
  },
);

const initialState = {
  data: null,
  status: 'loading',
};

const productSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Add product
    builder.addCase(fetchProductAdd.pending, (state) => {
      state.status = 'loading';
      state.data = null;
    });
    builder.addCase(fetchProductAdd.fulfilled, (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    });
    builder.addCase(fetchProductAdd.rejected, (state) => {
      state.status = 'error';
      state.data = null;
    });
  },
});

//export const { logout } = authSlice.actions;

export const authReducer = productSlice.reducer;
