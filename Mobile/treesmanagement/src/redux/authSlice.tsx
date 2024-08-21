import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { LoginRes } from "../interfaces/Response/User/LoginRes";

const initialState: LoginRes = {
  token: "",
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<LoginRes>) => {
      (state.token = action.payload.token), (state.user = action.payload.user);
    },
    removeAuth: (state) => {
      (state.token = ""), (state.user = null);
    },
  },
});

export const { setAuth, removeAuth } = authSlice.actions;

export default authSlice.reducer;
