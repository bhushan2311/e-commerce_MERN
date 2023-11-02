import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { createUser} from './authAPI'

// the below is 'state.product' where the product is inside store
const initialState = {
    loggedInUser:null,
  status:'idle'
};

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const authSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        increment: (state) => {
          state.value += 1;
        },
        incrementByAmount: (state, action) => {
          state.value += action.payload;
        },
      },
      extraReducers: (builder) => {
        builder
          .addCase(createUserAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(createUserAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.loggedInUser = action.payload;
          })
        }
})

export const selectLoggedInUser = (state) => state.auth.loggedInUser;

export default authSlice.reducer;