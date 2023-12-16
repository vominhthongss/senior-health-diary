import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { parseToSchedule } from "../../helps/parseToSchedule";
import { FAILED, LOADING, SUCCEEDED } from "../../constants/store";
import api from "../../services/api";

const initialState = {
  schedules: undefined,
  status: "idle",
  error: null,
};

export const fetchSchedule = createAsyncThunk(
  "schedules/fetchSchedule",
  async () => {
    try {
      const response = await api.get("/schedules");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setSchedules: (state, action) => {
      state.schedules = action.payload;
    },
    updateSchedule: (state, action) => {
      const { date, schedule } = action.payload;
      state.schedules[date] = [...(state.schedules[date] || []), schedule];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedule.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(fetchSchedule.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.schedules = parseToSchedule(action.payload);
      })
      .addCase(fetchSchedule.rejected, (state, action) => {
        state.status = FAILED;
        state.error = action.error.message;
      });
  },
});

export const { setSchedules, updateSchedule } = scheduleSlice.actions;

export default scheduleSlice.reducer;
