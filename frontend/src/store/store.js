import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import themeReducer from "./themeSlice";
import interviewReducer from "./interviewSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    interview: interviewReducer
  }
});

export default store;
