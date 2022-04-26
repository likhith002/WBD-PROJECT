import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "../features/Reducers/CartSlice";
import UserReducer from "../features/Reducers/UserSlice";

import WishReducer from "../features/Reducers/WishlistSlice";
import PaymentReducer from "../features/Reducers/PaymentSlice";
import productReducer from "../features/Reducers/ProductSlice";
import AddressReducer from "../features/Reducers/AddressSlice";
export const store = configureStore({
  reducer: {
    cart: CartReducer,
    wishlist: WishReducer,
    user: UserReducer,

    payment: PaymentReducer,
    product: productReducer,
    address: AddressReducer,
  },
});
