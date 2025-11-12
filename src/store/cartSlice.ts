import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';
import { Product } from './productsSlice';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const cartItem = state.items.find(item => item.id === action.payload.id);
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const cartItem = state.items.find(item => item.id === action.payload.id);
      if (cartItem) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(item => item.id !== action.payload.id);
        } else {
          cartItem.quantity = action.payload.quantity;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, entry) => total + entry.quantity, 0)
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (items) =>
    items.reduce((total, entry) => total + entry.price * entry.quantity, 0).toFixed(2)
);

export default cartSlice.reducer;