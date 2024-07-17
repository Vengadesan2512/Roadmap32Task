// src/features/products/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('https://652419a7ea560a22a4e96c20.mockapi.io/task');
  return response.data[0].products;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    incrementQuantity: (state, action) => {
      const product = state.products.find((product) => product.id === action.payload);
      if (product) {
        product.quantity = (product.quantity || 0) + 1;
      }
    },
    decrementQuantity: (state, action) => {
      const product = state.products.find((product) => product.id === action.payload);
      if (product && product.quantity > 0) {
        product.quantity -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { incrementQuantity, decrementQuantity } = productsSlice.actions;

export default productsSlice.reducer;
