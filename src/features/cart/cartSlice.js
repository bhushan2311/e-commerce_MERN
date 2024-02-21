import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart } from './cartAPI';
import { fetchItemsbyUserId,deleteFromCart,updateCart,resetCart } from './cartAPI';

const initialState = {
  items: [],
  status: 'idle',
  cartLoaded: false           // ensures items fetch to the cart from api
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
  async () => {
    const response = await fetchItemsbyUserId();
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
  async () => {
    const response = await resetCart();
    console.log(response);
    // return response.status;
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
        state.cartLoaded = true;    // respond send as cart loaded
      })
      .addCase(fetchItemsbyUserIdAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.cartLoaded = true;    // respond send as cart not loaded  (sending response means true weather response is fulfilled or rejected)
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
export const selectCartLoaded = (state) => state.cart.cartLoaded;
export const selectCartStatus = (state) => state.cart.status;

export default counterSlice.reducer;
