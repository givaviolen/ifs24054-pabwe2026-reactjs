import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../api/authApi";
import { putAccessToken } from "../../../helpers/apiHelper";
import { showSuccessDialog, showErrorDialog } from "../../../helpers/toolsHelper";

export const asyncLoginUser = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await loginUser(payload);
      putAccessToken(response.data.token);
      showSuccessDialog("Berhasil", "Login berhasil!");
      return response.data;
    } catch (error) {
      showErrorDialog("Gagal", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const asyncRegisterUser = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await registerUser(payload);
      showSuccessDialog("Berhasil", "Registrasi berhasil! Silakan login.");
      return response.data;
    } catch (error) {
      showErrorDialog("Gagal", error.message);
      return rejectWithValue(error.message);
    }
  }
);
