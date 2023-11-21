import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    registerSuccess: (state, { payload }) => {
      state.token = payload.token;
      state.user = payload;
      state.loading = false;
      state.success = true;

      toast.success("Registered");
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { registerStart, registerSuccess, registerFailure } =
  registrationSlice.actions;

// export const isAuthenticated = (state) =>{
  // return (state.token && state?.token.length > 4);
// }

export default registrationSlice.reducer;
