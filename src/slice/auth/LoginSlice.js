import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    loginSuccess: (state, { payload }) => {
      state.token = payload.token;
      state.user = payload;
      state.loading = false;
      state.success = true;

      toast.success("Registered");
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } =
  loginSlice.actions;

export const isAuthenticated = (state) =>
  (state?.login?.token && state?.login?.token.length > 4);

export default loginSlice.reducer;
