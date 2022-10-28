import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';
import { AuthSliceState, LoginParams, RegisterParams } from './types';

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (params: LoginParams) => {
  const { data } = await axios.post('/auth/login', params);
  return data;
});

export const fetchMe = createAsyncThunk('auth/fetchMe', async () => {
  const { data } = await axios.get('/auth/me');
  return data;
});

export const fetchRegister = createAsyncThunk('auth/register', async (params: RegisterParams) => {
  const { data } = await axios.post('/auth/register', params);
  return data;
});

const initialState: AuthSliceState = {
  data: null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      window.localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(fetchLogin.pending, (state) => {
      state.status = 'loading';
      state.data = null;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchLogin.rejected, (state) => {
      state.status = 'error';
      state.data = null;
    });
    //Me
    builder.addCase(fetchMe.pending, (state) => {
      state.status = 'loading';
      state.data = null;
    });
    builder.addCase(fetchMe.fulfilled, (state, action) => {
      state.data = action.payload.userData;
      state.status = 'success';
    });
    builder.addCase(fetchMe.rejected, (state) => {
      state.status = 'error';
      state.data = null;
    });
    //register
    builder.addCase(fetchRegister.pending, (state) => {
      state.status = 'loading';
      state.data = null;
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchRegister.rejected, (state) => {
      state.status = 'error';
      state.data = null;
    });
  },
});

export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
