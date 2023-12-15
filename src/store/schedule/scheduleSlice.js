import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  schedules: {
    "2023-12-01": [{ type: "remind", time: "12:00", text: "Meeting at 10am" }],
    "2023-12-12": [
      { type: "remind", time: "12:00", text: "Lunch with colleagues" },
      { type: "remind", time: "12:00", text: "Shopping" },
    ],
    "2023-12-13": [{ type: "remind", time: "12:00", text: "Gym at 5pm" }],
    "2023-12-14": [
      {
        type: "diary",
        sick: "Cao huyết áp",
        symptoms: "Nhức đầu",
        description: "Đau hoài",
        date: "2023-12-14",
      },
    ],
  },
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setSchedules: (state, action) => {
      state.schedules = action.payload;
    },
    updateSchedule: (state, action) => {
      const { date, newItem } = action.payload;
      state.schedules[date] = [...(state.schedules[date] || []), newItem];
    },
  },
});

export const { setSchedules, updateSchedule } = scheduleSlice.actions;

export default scheduleSlice.reducer;
