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
  const existing = state.items.find(entry => entry.id === action.payload.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.items.push({ ...action.payload, quantity: 1 });
  }
},

removeFromCart: (state, action: PayloadAction<number>) => {
  state.items = state.items.filter(entry => entry.id !== action.payload);
},

updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
  const found = state.items.find(entry => entry.id === action.payload.id);
  if (found) {
    if (action.payload.quantity <= 0) {
      state.items = state.items.filter(entry => entry.id !== action.payload.id);
    } else {
      found.quantity = action.payload.quantity;
    }
  }
},
    clearCart: (state) => {
      console.log('clearCart reducer triggered');
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, cartEntry) => total + cartEntry.quantity, 0)
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (items) =>
    items.reduce((total, cartEntry) => total + cartEntry.price * cartEntry.quantity, 0).toFixed(2)
);

export default cartSlice.reducer;