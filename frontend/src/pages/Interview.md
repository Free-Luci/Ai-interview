import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import useInterview from "../hooks/useInterview";
import toast from "react-hot-toast";

const QUESTIONS = [
  "Explain your understanding of this role basics.",
  "What skills are important for this role?",
  "How would you improve yourself in this role?",
  "Explain a challenge you might face in this role.",
  "Why should a company hire you for this role?"
];

const ANSWER_TIME_LIMIT = 240; // 4 minutes
const LEAVE_LIMIT = 10; // seconds
const VALID_REASONS = ["TAB_SWITCH", "PAGE_CLOSE", "TIME_EXPIRED"];

const Interview = () => {
  const { state } = useLocation();
  const role = state?.role || "frontend";

  const [questionIndex, setQuestionIndex] = useState(
    Number(localStorage.getItem("questionIndex")) || 0
  );
  const question = QUESTIONS[questionIndex];

  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(ANSWER_TIME_LIMIT);

  const [showLeaveWarning, setShowLeaveWarning] = useState(false);
  const [leaveCountdown, setLeaveCountdown] = useState(LEAVE_LIMIT);
  const [retryLocked, setRetryLocked] = useState(false);

  const leaveIntervalRef = useRef(null);
  const autoSubmittedRef = useRef(false);
  const leftTabRef = useRef(false);

  const {
    submitAnswer,
    feedback,
    loading,
    error,
    resetInterview
  } = useInterview();

  /* ===================== CORE SUBMIT ===================== */
  const submit = ({
    autoSubmitted = false,
    autoSubmitReason = null
  } = {}) => {
    submitAnswer({
      role,
      topic: "Basics",
      question,
      questionIndex,
      answer,
      autoSubmitted,
      autoSubmitReason
    });
  };

  /* ===================== AUTO SUBMIT ===================== */
  const autoSubmit = (reason) => {
    if (!VALID_REASONS.includes(reason)) return;
    if (
      autoSubmittedRef.current ||
      loading ||
      feedback ||
      retryLocked ||
      answer.trim().length < 20
    ) return;

    autoSubmittedRef.current = true;
    setRetryLocked(true);

    submit({
      autoSubmitted: true,
      autoSubmitReason: reason
    });
  };

  /* ===================== TIMER ===================== */
  useEffect(() => {
    if (loading || feedback) return;

    if (timeLeft <= 0) {
      autoSubmit("TIME_EXPIRED");
      return;
    }

    const t = setInterval(() => {
      setTimeLeft((p) => p - 1);
    }, 1000);

    return () => clearInterval(t);
  }, [timeLeft, loading, feedback]);

  /* ===================== TAB SWITCH ===================== */
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && !autoSubmittedRef.current && !feedback) {
        leftTabRef.current = true;
        setShowLeaveWarning(true);
        setLeaveCountdown(LEAVE_LIMIT);

        leaveIntervalRef.current = setInterval(() => {
          setLeaveCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(leaveIntervalRef.current);
              autoSubmit("TAB_SWITCH");
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }

      if (!document.hidden && leftTabRef.current) {
        clearInterval(leaveIntervalRef.current);
        setShowLeaveWarning(false);
        leftTabRef.current = false;
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      clearInterval(leaveIntervalRef.current);
    };
  }, [feedback, loading]);

  /* ===================== PAGE CLOSE ===================== */
  useEffect(() => {
    const handleUnload = (e) => {
      autoSubmit("PAGE_CLOSE");
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [answer]);

  /* ===================== CTRL + ENTER ===================== */
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.key === "Enter" && answer.length >= 20) {
        submit();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [answer]);

  /* ===================== PERSIST INDEX ===================== */
  useEffect(() => {
    localStorage.setItem("questionIndex", questionIndex);
  }, [questionIndex]);

  /* ===================== FEEDBACK HANDLERS ===================== */
  const handleRetry = () => {
    if (retryLocked) return;
    setAnswer("");
    setTimeLeft(ANSWER_TIME_LIMIT);
    autoSubmittedRef.current = false;
    resetInterview();
  };

  const handleContinue = () => {
    clearInterval(leaveIntervalRef.current);
    setShowLeaveWarning(false);
    setQuestionIndex((i) => i + 1);
    setAnswer("");
    setTimeLeft(ANSWER_TIME_LIMIT);
    autoSubmittedRef.current = false;
    setRetryLocked(false);
    resetInterview();
  };

  /* ===================== TOASTS ===================== */
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (feedback) toast.success("Interview evaluated successfully!");
  }, [feedback]);

  const currentStep = feedback ? 3 : loading ? 2 : 1;

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">

      {/* LEAVE WARNING */}
      {showLeaveWarning && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-md">
            <h3 className="font-bold text-xl text-warning">Leaving Interview</h3>
            <p className="mt-4">Auto-submit in</p>
            <p className="text-5xl font-extrabold text-error mt-3">
              {leaveCountdown}s
            </p>
            <div className="modal-action">
              <button
                className="btn btn-primary"
                onClick={handleContinue}
              >
                Continue Interview
              </button>
            </div>
          </div>
        </dialog>
      )}

      <h1 className="text-4xl font-extrabold mb-6">
        {role.toUpperCase()} Interview
      </h1>

      <ul className="steps steps-horizontal w-full mb-14">
        <li className={`step ${currentStep >= 1 && "step-primary"}`}>Question</li>
        <li className={`step ${currentStep >= 2 && "step-primary"}`}>Answer</li>
        <li className={`step ${currentStep >= 3 && "step-primary"}`}>AI Feedback</li>
      </ul>

      <div className="card bg-base-100 shadow-xl mb-10">
        <div className="card-body">
          <p className="text-2xl">{question}</p>
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <span>Time Remaining</span>
        <span className="font-mono text-2xl">
          {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
        </span>
      </div>

      <textarea
        className="textarea textarea-bordered w-full min-h-[220px]"
        value={answer}
        disabled={loading}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <div className="mt-6 flex justify-between">
        <span>Ctrl + Enter to submit</span>
        <button
          className="btn btn-primary btn-lg"
          disabled={loading || answer.length < 20}
          onClick={() => submit()}
        >
          🚀 Submit Answer
        </button>
      </div>

      {feedback && (
        <div className="card bg-base-100 shadow-xl mt-10">
          <div className="card-body space-y-6">
            <h2 className="text-3xl font-bold">
              Score: {feedback.score}/10
            </h2>

            <button
              className="btn btn-primary btn-lg"
              disabled={retryLocked}
              onClick={handleRetry}
            >
              Retry
            </button>

            <button
              className="btn btn-success btn-lg"
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
    
  );
};

export default Interview;
