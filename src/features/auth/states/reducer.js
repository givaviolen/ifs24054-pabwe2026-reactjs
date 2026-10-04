import { createSlice } from "@reduxjs/toolkit";
import { asyncLoginUser, asyncRegisterUser } from "./action";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthLogin: false,
    isAuthRegister: false,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("accessToken");
      state.isAuthLogin = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncLoginUser.pending, (state) => {
        state.isAuthLogin = true;
      })
      .addCase(asyncLoginUser.fulfilled, (state) => {
        state.isAuthLogin = false;
      })
      .addCase(asyncLoginUser.rejected, (state) => {
        state.isAuthLogin = false;
      })
      .addCase(asyncRegisterUser.pending, (state) => {
        state.isAuthRegister = true;
      })
      .addCase(asyncRegisterUser.fulfilled, (state) => {
        state.isAuthRegister = false;
      })
      .addCase(asyncRegisterUser.rejected, (state) => {
        state.isAuthRegister = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
