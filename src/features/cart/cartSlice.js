import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart } from './cartAPI';
import { fetchItemsbyUserId,deleteFromCart,updateCart,resetCart } from './cartAPI';

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

export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async (item) => {
    const response = await updateCart(item);
    return response.data;
  }
);

export const deleteFromCartAsync = createAsyncThunk(
  'cart/deleteFromCart',
  async (productId) => {
    const response = await deleteFromCart(productId);
    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async (userId) => {
    const response = await resetCart(userId);
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
      .addCase(deleteFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteFromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const itemIndex = state.items.findIndex(item=>item.id === action.payload.id)
        state.items.splice(itemIndex,1);
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item=>item.id === action.payload.id)
        state.items[index] = action.payload;
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = [];
      })
  },
});

export const selectCartItems = (state) => state.cart.items;


export default counterSlice.reducer;
