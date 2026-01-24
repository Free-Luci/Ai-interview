import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: false,   // 🔥 ALWAYS false at first
  loading: true,            // 🔥 important
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      localStorage.setItem("token", action.payload.token);
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      localStorage.clear();
    },

    finishAuthCheck: (state, action) => {
      state.isAuthenticated = action.payload;
      state.loading = false;
    },
  },
});

export const { loginSuccess, logout, finishAuthCheck } = authSlice.actions;
export default authSlice.reducer;




