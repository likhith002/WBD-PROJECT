import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {},
};

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    add_product: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { add_product } = ProductSlice.actions;
export const selectproduct = (state) => state.product.product;
export default ProductSlice.reducer;
