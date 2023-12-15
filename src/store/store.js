import { configureStore } from "@reduxjs/toolkit";
import scheduleReducer from "./schedule/scheduleSlice";

const store = configureStore({
  reducer: {
    schedule: scheduleReducer,
  },
});

export default store;
