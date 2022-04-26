import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
  wish_btn: true,
};

const WishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addtoWish: (state, action) => {
      state.wishlist.push(action.payload);
    },

    removefromWish: (state, action) => {
      const index = state.wishlist.findIndex(
        (cartItem) => cartItem._id === action.payload.product_id
      );
      const newCart = [...state.wishlist];
      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        alert(`Cant remove product  as its not in List!`);
      }
      state.wishlist = newCart;
    },

    wishbtn_active: (state, action) => {
      state.wish_btn = true;
    },
    wishbtn_inactive: (state, action) => {
      state.wish_btn = false;
    },
  },
});

export const { addtoWish, removefromWish, wishbtn_active, wishbtn_inactive } =
  WishlistSlice.actions;
export default WishlistSlice.reducer;
export const SelectWishlist = (state) => state.wishlist.wishlist;
export const SelectWishbtn = (state) => state.wishlist.wish_btn;
