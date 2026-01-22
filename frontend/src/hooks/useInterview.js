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

  const submitAnswer = async ({ role,
     topic, 
     question,
      questionIndex,
    answer,
    autoSubmitted = false,
    autoSubmitReason = null
   }) => {
    if (!answer || answer.trim().length < 20) {
      dispatch(evaluationFailure("Answer must be at least 20 characters"));
      return;
    }

    dispatch(startEvaluation());

    try {
      const payload={
  
        role,
        topic,
        question,
        questionIndex,
        answer,
        autoSubmitted,
        autoSubmitReason,
      }
  //   console.log("✅ BACKEND RESPONSE:", res.data);

  //     dispatch(evaluationSuccess(res.data.feedback));
  //   } catch (err) {
  //   console.error("❌ AXIOS ERROR:", err.response?.data || err.message);

  //     dispatch(
  //       evaluationFailure(
  //         err.response?.data?.message ||
  //           "AI service temporarily unavailable"
  //       )
  //     );
  //   }
  // };
   console.log("🚀 AXIOS SENDING PAYLOAD:", payload);

      const res = await api.post("/api/interview/submit", payload);

      console.log("✅ BACKEND RESPONSE:", res.data);

      dispatch(evaluationSuccess(res.data.feedback));
    } catch (err) {
      console.error("❌ AXIOS ERROR:", err.response?.data || err.message);

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
