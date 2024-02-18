import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { loginUser, createUser, signOut, checkAuth } from "./authAPI";

// the below is 'state.product' where the product is inside store
const initialState = {
  loggedInUserToken: null, // storing loggedInUser token
  status: "idle",
  error: null,
  userChecked: false
};

// -------------------------- Create new User Async -----------------------------------------
export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

// ----------------------------- Login User Async -----------------------------------------
export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (loginInfo) => {
    const response = await loginUser(loginInfo);
    return response.data;
  }
);

// ----------------------------- Check auth Async (user remain sign in after reload) -----------------------------------------
export const checkAuthAsync = createAsyncThunk(
  "user/checkAuth",
  async () => {
    const response = await checkAuth();
    return response.data;
  }
);

//  --------------- Signout loggedInUser --------------
export const signOutAsnyc = createAsyncThunk(
  "user/signOut",
  async (usesrId) => {
    const response = await signOut(usesrId);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "user",
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
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
        state.userChecked = true; // -------
      })
      .addCase(signOutAsnyc.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = null;
      })
      .addCase(signOutAsnyc.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectuserChecked = (state) => state.auth.userChecked;

export default authSlice.reducer;
