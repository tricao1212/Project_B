import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ILoginRes } from "../../interfaces/Response/ILoginRes";

const initialState: ILoginRes = {
  token: "",
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<ILoginRes>) => {
      (state.token = action.payload.token), (state.user = action.payload.user);
    },
    removeAuth: (state) => {
      (state.token = ""), (state.user = null);
    },
  },
});

export const { setAuth, removeAuth } = authSlice.actions;

export default authSlice.reducer;
