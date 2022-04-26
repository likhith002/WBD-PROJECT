import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: {},
};

const AddressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    add_address: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const { add_address } = AddressSlice.actions;

export default AddressSlice.reducer;
export const selectaddress = (state) => state.address.address;
