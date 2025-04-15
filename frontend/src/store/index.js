import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userSlice,
  },
});

export default store;
