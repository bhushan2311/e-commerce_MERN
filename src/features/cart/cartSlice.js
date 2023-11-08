import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart } from './cartAPI';
import { fetchItemsbyUserId } from './cartAPI';

const initialState = {
  items: [],
  status: 'idle',
};

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);

export const fetchItemsbyUserIdAsync = createAsyncThunk(
  'cart/fetchItemsbyUserId',
  async (userId) => {
    const response = await fetchItemsbyUserId(userId);
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'cart',
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
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      }).addCase(fetchItemsbyUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsbyUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
  },
});

export const selectCartItems = (state) => state.cart.items;

export default counterSlice.reducer;
