import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FAILED, LOADING, SUCCEEDED } from "../../constants/store";
import api from "../../services/api";

const initialState = {
  savedSicks: undefined,
  status: "idle",
  error: null,
};

export const fetchSavedSicks = createAsyncThunk(
  "sickDetail/fetchSavedSicks",
  async () => {
    try {
      const response = await api.get("/savedSicks");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
const sickDetailSlice = createSlice({
  name: "sickDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchSavedSicks.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(fetchSavedSicks.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.savedSicks = action.payload;
      })
      .addCase(fetchSavedSicks.rejected, (state, action) => {
        state.status = FAILED;
      });
  },
});

export const {} = sickDetailSlice.actions;

export default sickDetailSlice.reducer;
