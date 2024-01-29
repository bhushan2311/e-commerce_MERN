import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { checkUser, createUser, signOut} from './authAPI'
import { updateUser } from '../user/userAPI';

// the below is 'state.product' where the product is inside store
const initialState = {
    loggedInUser:null,
  status:'idle',
  error:null
};

// -------------------------- Create new User Async -----------------------------------------
export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

// ----------------------------- Check User Async -----------------------------------------
export const checkUserAsync = createAsyncThunk(
    'user/checkUser',
    async(loginInfo)=>{
        const response = await checkUser(loginInfo);
        return response.data;
    }
)
// --------------------------- Update user address ---------------------
export const updateUserAsync = createAsyncThunk(
    'user/updateUser',
    async(update)=>{
        const response = await updateUser(update);
        return response.data;
    }
)
//  --------------- Signout loggedInUser --------------
export const signOutAsnyc = createAsyncThunk(
    'user/signOut',
    async(usesrId)=>{
        const response = await signOut(usesrId);
        return response.data;
    }
)

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
          .addCase(createUserAsync.rejected, (state, action) => {
            state.status = 'idle';
            state.error = action.error;
          })
          .addCase(checkUserAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(checkUserAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.loggedInUser = action.payload;
          })
          .addCase(checkUserAsync.rejected, (state, action) => {
            state.status = 'idle';
            state.error = action.error;
          })
          .addCase(updateUserAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.loggedInUser = action.payload;
          })
          .addCase(updateUserAsync.rejected, (state, action) => {
            state.status = 'idle';
            state.error = action.error;
          })
          .addCase(signOutAsnyc.fulfilled, (state, action) => {
            state.status = 'idle';
            state.loggedInUser = null;
          })
          .addCase(signOutAsnyc.rejected, (state, action) => {
            state.status = 'idle';
            state.error = action.error;
          })
        }
})

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;