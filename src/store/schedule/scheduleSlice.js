import { createSlice } from "@reduxjs/toolkit";
import { scheduleMock } from "../../mock/schedule";
import { parseToSchedule } from "../../helps/parseToSchedule";

const initialState = {
  schedules: parseToSchedule(scheduleMock),
};

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
});

export const { setSchedules, updateSchedule } = scheduleSlice.actions;

export default scheduleSlice.reducer;
