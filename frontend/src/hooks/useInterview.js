import { useDispatch, useSelector } from "react-redux";
import api from "../utils/axiosInstance";

import {
  startEvaluation,
  evaluationSuccess,
  evaluationFailure,
  clearFeedback
} from "../store/interviewSlice";

const useInterview = () => {
  const dispatch = useDispatch();
  const interviewState = useSelector((state) => state.interview);

  const submitAnswer = async ({ role, topic, question, answer }) => {
    if (!answer || answer.trim().length < 20) {
      dispatch(evaluationFailure("Answer must be at least 20 characters"));
      return;
    }

    dispatch(startEvaluation());

    try {
      const res = await api.post("/interview/submit", {
        role,
        topic,
        question,
        answer
      });

      dispatch(evaluationSuccess(res.data.feedback));
    } catch (err) {
      dispatch(
        evaluationFailure(
          err.response?.data?.message ||
            "AI service temporarily unavailable"
        )
      );
    }
  };

  const resetInterview = () => {
    dispatch(clearFeedback());
  };

  return {
    ...interviewState,
    submitAnswer,
    resetInterview
  };
};

export default useInterview;
