import { createSlice } from "@reduxjs/toolkit";

const interviewSlice = createSlice({
  name: "interview",
  initialState: {
    feedback: null,
    loading: false,
    error: null
  },
  reducers: {
    startEvaluation: (state) => {
      state.loading = true;
      state.error = null;
    },
    evaluationSuccess: (state, action) => {
      state.loading = false;
      state.feedback = action.payload;
    },
    evaluationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearFeedback: (state) => {
      state.feedback = null;
      state.error = null;
    }
  }
});

export const {
  startEvaluation,
  evaluationSuccess,
  evaluationFailure,
  clearFeedback
} = interviewSlice.actions;

export default interviewSlice.reducer;
