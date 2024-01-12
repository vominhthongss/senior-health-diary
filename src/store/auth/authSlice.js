import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { parseToSchedule } from "../../helps/parseToSchedule";
import { FAILED, LOADING, SUCCEEDED } from "../../constants/store";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const initialState = {
  token: undefined,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    try {
      const response = await axios.post(
        `https://apimp.smartdevgroup.com/index.php?route=extension/mstore/account/login`,
        {
          email: email,
          password: password,
        }
      );
      AsyncStorage.setItem("userEmail", email);

      //đây chỉ là mô phỏng lấy token
      //khi có api login thực thì bỏ nó đi

      if (response.status === 200) {
        return {
          token: "AgVukCfSV8hMpX2MaTQBwCBkhEUpZBAX9XuJLRCFY",
          fullName: `${response.data.firstname} ${response.data.lastname}`,
          age: "90",
        };
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
export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ fullName, email, password, age }) => {
    try {
      const response = await api.post("/users", {
        email: email,
        password: password,
      });
      AsyncStorage.setItem("userEmail", email);

      //đây chỉ là mô phỏng lấy token
      //khi có api signup thực thì bỏ nó đi

      if (response.data) {
        return {
          token: "token",
          fullName: fullName,
          age: age,
        };
      }

      //khi có api signup thực thì bỏ nó đi

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
        const { token, fullName, age } = action.payload;
        AsyncStorage.setItem("token", token);
        AsyncStorage.setItem("fullName", fullName);
        AsyncStorage.setItem("age", age);
        state.token = token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = FAILED;
        state.error = action.error.message;
      })
      .addCase(signUp.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        const { token, fullName, age } = action.payload;
        AsyncStorage.setItem("token", token);
        AsyncStorage.setItem("fullName", fullName);
        AsyncStorage.setItem("age", age);
        state.token = token;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = FAILED;
        state.error = action.error.message;
      });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
