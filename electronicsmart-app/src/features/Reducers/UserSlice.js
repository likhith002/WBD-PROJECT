import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },

    logout: (state, action) => {
      state.user = null;
    },
    changefn: (state, action) => {
      state.user.firstName = action.payload.fn;
    },
    changeln: (state, action) => {
      state.user.lastName = action.payload.ln;
    },
  },
});

export const { login, logout, changefn, changeln } = UserSlice.actions;
export default UserSlice.reducer;
export const SelectUser = (state) => state.user.user;
