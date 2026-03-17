import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { client } from '../../api/client';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.getPosts();
  return response;
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost, { getState }) => {
  const state = getState(); 
  const currentUser = state.user; 

  const postData = {
    content: initialPost.content,
    privacy: initialPost.privacy,
    mood: initialPost.mood,
    author: currentUser, 
  };
  const response = await client.addPost(postData);
  return response;
});

const initialState = {
  posts: [],
  status: 'idle',
  error: null
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const post = state.posts.find(p => p.id === action.payload);
      if (post) {
        post.isLikedByMe = !post.isLikedByMe;
        post.likes += post.isLikedByMe ? 1 : -1;
      }
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    addComment: (state, action) => {
      const { postId, text, user } = action.payload; 
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        post.comments.push({
          id: uuidv4(),
          author: user,
          text,
          createdAt: new Date().toISOString(),
        });
      }
    },
    deleteComment: (state, action) => {
      const { postId, commentId } = action.payload;
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        post.comments = post.comments.filter(c => c.id !== commentId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      });
  }
});

export const { toggleLike, deletePost, addComment, deleteComment } = postsSlice.actions;
export default postsSlice.reducer;