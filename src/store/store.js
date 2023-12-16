import { configureStore } from "@reduxjs/toolkit";
import scheduleReducer from "./schedule/scheduleSlice";
import authReducer from "./auth/authSlice";

const store = configureStore({
  reducer: {
    schedule: scheduleReducer,
    auth: authReducer,
  },
});

export default store;
