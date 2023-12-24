import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { parseToSchedule } from "../../helps/parseToSchedule";
import { FAILED, LOADING, SUCCEEDED } from "../../constants/store";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const initialState = {
  user: undefined,
  status: "idle",
  error: null,
};

export const fetchUser = createAsyncThunk(
  "userInformation/fetchUser",
  async () => {
    try {
      const userEmail = await AsyncStorage.getItem("userEmail");
      const response = await api.get(`/users/?email=${userEmail}`);
      return response.data[0];
    } catch (error) {
      throw error;
    }
  }
);
export const updateUser = createAsyncThunk(
  "userInformation/updateUser",
  async ({ user, id }) => {
    try {
      const response = await api.patch(`/users/${id}`, {
        email: user.email,
        age: user.age,
        sex: user.sex,
        fullName: user.fullName,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
const userInformationSlice = createSlice({
  name: "userInformation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {})
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = FAILED;
      });
  },
});

export const {} = userInformationSlice.actions;

export default userInformationSlice.reducer;
