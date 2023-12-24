import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { parseToSchedule } from "../../helps/parseToSchedule";
import { FAILED, LOADING, SUCCEEDED } from "../../constants/store";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
const userInformationSlice = createSlice({
  name: "userInformation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = FAILED;
        state.error = action.error.message;
      });
  },
});

export const {} = userInformationSlice.actions;

export default userInformationSlice.reducer;
