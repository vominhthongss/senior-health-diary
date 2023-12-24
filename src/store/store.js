import { configureStore } from "@reduxjs/toolkit";
import scheduleReducer from "./schedule/scheduleSlice";
import authReducer from "./auth/authSlice";
import userInformationReducer from "./userInformation/userInformationSlice";
import changePasswordReducer from "./changePassword/changePasswordSlice";

const store = configureStore({
  reducer: {
    schedule: scheduleReducer,
    auth: authReducer,
    userInformation: userInformationReducer,
    changePassword: changePasswordReducer,
  },
});

export default store;
