import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { parseToSchedule } from "../../helps/parseToSchedule";
import { FAILED, LOADING, SUCCEEDED } from "../../constants/store";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  token: undefined,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    try {
      const response = await api.get(
        `/users/?email=${email}&?password=${password}`
      );
      AsyncStorage.setItem("userEmail", email);

      //đây chỉ là mô phỏng lấy token
      //khi có api login thực thì bỏ nó đi

      if (response.data[0].id) {
        return { token: JSON.stringify(response.data[0]) };
      } else {
        return { token: "" };
      }
      //khi có api login thực thì bỏ nó đi

      //thay bằng

      //return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        const { token } = action.payload;
        AsyncStorage.setItem("token", token);
        state.token = token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = FAILED;
        state.error = action.error.message;
      });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;