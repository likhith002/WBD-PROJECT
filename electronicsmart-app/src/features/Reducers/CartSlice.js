import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  cart_btn: true,
  total: 0,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      state.cart.push(action.payload);
      state.total = state.total + action.payload.price;
    },
    removefromCart: (state, action) => {
      const index = state.cart.findIndex(
        (cartItem) => cartItem._id === action.payload.product_id
      );
      state.total = state.total - state.cart[index].price;
      const newCart = [...state.cart];
      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        alert(`Cant remove product  as its not in basket!`);
      }

      state.cart = newCart;
    },
    cartbtn_active: (state, action) => {
      state.cart_btn = true;
    },
    cartbtn_inactive: (state, action) => {
      state.cart_btn = false;
    },
  },
});

export const { addtoCart, removefromCart, cartbtn_inactive, cartbtn_active } =
  CartSlice.actions;
export default CartSlice.reducer;
export const SelectCart = (state) => state.cart.cart;
export const SelectCartbtn = (state) => state.cart.cart_btn;
export const SelectTotal = (state) => state.cart.total;
