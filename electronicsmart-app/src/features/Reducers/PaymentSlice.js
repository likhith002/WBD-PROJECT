import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payment: [],
};

const PaymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    add_payment: (state, action) => {
      state.payment = [action.payload];
    },
  },
});

export const { add_payment } = PaymentSlice.actions;
export default PaymentSlice.reducer;
export const SelectPayment = (state) => state.payment.payment;
