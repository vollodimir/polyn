import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

const initialState = {
  posts: {
    item: [],
    status: 'loading',
  },
  tags: {
    item: [],
    status: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.posts.status = 'loading';
      state.posts.item = [];
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts.item = action.payload;
      state.posts.status = 'success';
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.posts.status = 'error';
      state.posts.item = [];
    });
  },
});

export const postsReducer = postsSlice.reducer;
