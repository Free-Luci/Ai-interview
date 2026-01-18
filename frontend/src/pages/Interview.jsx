// import { useLocation } from "react-router-dom";
// import { useEffect, useState, useRef } from "react";
// import useInterview from "../hooks/useInterview";
// import toast from "react-hot-toast";

// const Interview = () => {
//   const { state } = useLocation();
//   const role = state?.role || "frontend";

//   const autoSubmitTest = () => {
//   if (
//     autoSubmittedRef.current ||
//     loading ||
//     !answer ||
//     feedback
//   ) {
//     return;
//   }

//   autoSubmittedRef.current = true;

//   submitAnswer({
//     role,
//     topic: "Basics",
//     question,
//     answer,
//     autoSubmitted: true // 👈 optional flag for backend
//   });
// };

//   const [answer, setAnswer] = useState("");
//   const [showGuide, setShowGuide] = useState(true);
//   const [confirmSubmit, setConfirmSubmit] = useState(false);

// //   Warning modal appears
// // Message: “Leaving will auto-submit your answer”
// // If user returns within 5 seconds → nothing happens
//   const [showLeaveWarning, setShowLeaveWarning] = useState(false);
// const leaveTimeoutRef = useRef(null);
// const autoSubmittedRef = useRef(false);

//   const {
//     feedback,
//     loading,
//     error,
//     submitAnswer,
//     resetInterview
//   } = useInterview();

//   const question = "Explain your understanding of this role basics.";

//   // const autoSubmittedRef = useRef(false);

//   const handleSubmit = () => {
//     setConfirmSubmit(false);
//     submitAnswer({
//       role,
//       topic: "Basics",
//       question,
//       answer
//     });
//   };

// // 📌 This triggers when:

// // User switches tab

// // Minimizes browser

// // Switches apps
//   useEffect(() => {
//   const handleVisibilityChange = () => {
//     if (document.hidden) {
//       autoSubmitTest();
//     }
//   };

//   document.addEventListener(
//     "visibilitychange",
//     handleVisibilityChange
//   );

//   return () => {
//     document.removeEventListener(
//       "visibilitychange",
//       handleVisibilityChange
//     );
//   };
// }, [answer, loading, feedback]);

// // ✔ Works even if user closes browser
// // ✔ Prevents accidental data loss
// useEffect(() => {
//   const handleBeforeUnload = (e) => {
//     autoSubmitTest();
//     e.preventDefault();
//     e.returnValue = "";
//   };

//   window.addEventListener("beforeunload", handleBeforeUnload);

//   return () => {
//     window.removeEventListener("beforeunload", handleBeforeUnload);
//   };
// }, [answer]);

// // TAB SWITCH DETECTION WITH DELAY
// useEffect(() => {
//   const handleVisibilityChange = () => {
//     if (document.hidden && !autoSubmittedRef.current) {
//       setShowLeaveWarning(true);

//       leaveTimeoutRef.current = setTimeout(() => {
//         autoSubmitTest();
//         setShowLeaveWarning(false);
//       }, 5000); // ⏱ 5 seconds grace period
//     }

//     if (!document.hidden) {
//       setShowLeaveWarning(false);
//       clearTimeout(leaveTimeoutRef.current);
//     }
//   };

//   document.addEventListener("visibilitychange", handleVisibilityChange);

//   return () => {
//     document.removeEventListener("visibilitychange", handleVisibilityChange);
//     clearTimeout(leaveTimeoutRef.current);
//   };
// }, [answer, loading, feedback]);

// // PAGE CLOSE / REFRESH (NO MODAL, DIRECT SUBMIT)
// useEffect(() => {
//   const handleBeforeUnload = (e) => {
//     autoSubmitTest();
//     e.preventDefault();
//     e.returnValue = "";
//   };

//   window.addEventListener("beforeunload", handleBeforeUnload);

//   return () => {
//     window.removeEventListener("beforeunload", handleBeforeUnload);
//   };
// }, [answer]);

//   /* ------------------ KEYBOARD SHORTCUT ------------------ */
//   useEffect(() => {
//     const handler = (e) => {
//       if (e.ctrlKey && e.key === "Enter" && answer.length > 20) {
//         setConfirmSubmit(true);
//       }
//     };
//     window.addEventListener("keydown", handler);
//     return () => window.removeEventListener("keydown", handler);
//   }, [answer]);

//   /* ------------------ TOAST: ERROR ------------------ */
//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//     }
//   }, [error]);

//   /* ------------------ TOAST: SUCCESS ------------------ */
//   useEffect(() => {
//     if (feedback) {
//       toast.success("Interview evaluated successfully!");
//     }
//   }, [feedback]);

//   const currentStep = feedback ? 3 : loading ? 2 : 1;

//   return (
//     <div className="p-6 md:p-10 max-w-6xl mx-auto">
//       <h1 className="text-3xl font-bold mb-2">
//         {role.toUpperCase()} Interview
//       </h1>
//       <p className="text-base-content/70 mb-6">
//         Answer the question as you would in a real interview.
//       </p>

//       {/* Stepper */}
//       <ul className="steps steps-horizontal w-full mb-10">
//         <li className={`step ${currentStep >= 1 ? "step-primary" : ""}`}>
//           Question
//         </li>
//         <li className={`step ${currentStep >= 2 ? "step-primary" : ""}`}>
//           Answer
//         </li>
//         <li className={`step ${currentStep >= 3 ? "step-primary" : ""}`}>
//           AI Feedback
//         </li>
//       </ul>

//       {/* Question */}
//       <div className="card bg-base-100 shadow mb-6">
//         <div className="card-body">
//           <h2 className="card-title">Interview Question</h2>
//           <p>{question}</p>
//         </div>
//       </div>

//       {/* Answer */}
//       <div className="card bg-base-100 shadow mb-6">
//         <div className="card-body">
//           <textarea
//             className="textarea textarea-bordered w-full h-44"
//             placeholder="Type your answer here (minimum 20 characters)..."
//             value={answer}
//             disabled={loading}
//             onChange={(e) => setAnswer(e.target.value)}
//           />

//           <div className="flex justify-between items-center mt-4">
//             <span className="text-sm text-base-content/60">
//               Tip: Press <kbd className="kbd kbd-sm">Ctrl</kbd> +
//               <kbd className="kbd kbd-sm">Enter</kbd> to submit
//             </span>

//             <button
//               className="btn btn-primary"
//               disabled={loading || answer.length < 20}
//               onClick={() => setConfirmSubmit(true)}
//             >
//               Submit Answer
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Loading Skeleton */}
//       {loading && (
//         <div className="card bg-base-100 shadow">
//           <div className="card-body space-y-4">
//             <div className="skeleton h-6 w-40" />
//             <div className="skeleton h-4 w-full" />
//             <div className="skeleton h-4 w-5/6" />
//             <div className="skeleton h-4 w-4/6" />
//           </div>
//         </div>
//       )}

//       {/* Feedback */}
//       {feedback && (
//         <div className="card bg-base-100 shadow">
//           <div className="card-body space-y-4">
//             <h2 className="card-title">
//               AI Feedback
//               <span className="badge badge-primary ml-2">
//                 Score: {feedback.score}/10
//               </span>
//             </h2>

//             <div>
//               <h3 className="font-semibold mb-1">Strengths</h3>
//               <div className="flex flex-wrap gap-2">
//                 {feedback.strengths.map((s, i) => (
//                   <span
//                     key={i}
//                     className="badge badge-success badge-outline"
//                   >
//                     {s}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h3 className="font-semibold mb-1">Improvements</h3>
//               <ul className="list-disc ml-6 text-sm">
//                 {feedback.improvements.map((i, idx) => (
//                   <li key={idx}>{i}</li>
//                 ))}
//               </ul>
//             </div>

//             <div>
//               <h3 className="font-semibold mb-1">Improved Answer</h3>
//               <p className="text-sm bg-base-200 p-4 rounded">
//                 {feedback.improvedAnswer}
//               </p>
//             </div>

//             <div>
//               <h3 className="font-semibold mb-1">Follow-up Question</h3>
//               <p className="italic">
//                 {feedback.followUpQuestion}
//               </p>
//             </div>

//             <button
//               className="btn btn-outline mt-2"
//               onClick={resetInterview}
//             >
//               Try Another Answer
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Instruction Modal */}
//       {showGuide && (
//         <dialog className="modal modal-open">
//           <div className="modal-box">
//             <h3 className="font-bold text-lg">
//               How this interview works
//             </h3>
//             <ul className="list-disc ml-6 mt-3 text-sm space-y-1">
//               <li>Answer like a real interview</li>
//               <li>AI evaluates clarity and basics</li>
//               <li>You receive improvement suggestions</li>
//             </ul>
//             <div className="modal-action">
//               <button
//                 className="btn btn-primary"
//                 onClick={() => setShowGuide(false)}
//               >
//                 Start Interview
//               </button>
//             </div>
//           </div>
//         </dialog>
//       )}

//       {/* Submit Confirmation Modal */}
//       {confirmSubmit && (
//         <dialog className="modal modal-open">
//           <div className="modal-box">
//             <h3 className="font-bold text-lg">
//               Submit your answer?
//             </h3>
//             <p className="text-sm mt-2">
//               You won’t be able to edit once submitted.
//             </p>
//             <div className="modal-action">
//               <button
//                 className="btn btn-outline"
//                 onClick={() => setConfirmSubmit(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="btn btn-primary"
//                 onClick={handleSubmit}
//               >
//                 Confirm Submit
//               </button>
//             </div>
//           </div>
//         </dialog>
//       )}
//       {/* WARNING MODAL Ui */}
//       {showLeaveWarning && (
//   <dialog className="modal modal-open">
//     <div className="modal-box">
//       <h3 className="font-bold text-lg text-warning">
//         Leaving Interview
//       </h3>
//       <p className="mt-2 text-sm">
//         If you leave this page, your answer will be automatically submitted.
//       </p>
//       <p className="text-xs text-base-content/60 mt-1">
//         Return within 5 seconds to continue.
//       </p>

//       <div className="modal-action">
//         <button
//           className="btn btn-primary"
//           onClick={() => {
//             setShowLeaveWarning(false);
//             clearTimeout(leaveTimeoutRef.current);
//           }}
//         >
//           Continue Interview
//         </button>
//       </div>
//     </div>
//   </dialog>
// )}

//     </div>
//   );
// };

// export default Interview;

import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import useInterview from "../hooks/useInterview";
import toast from "react-hot-toast";

const Interview = () => {
  const { state } = useLocation();
  const role = state?.role || "frontend";

  // const question = "Explain your understanding of this role basics.";

  const [answer, setAnswer] = useState("");
  const [showLeaveWarning, setShowLeaveWarning] = useState(false);
  const [leaveCountdown, setLeaveCountdown] = useState(10);

 const leaveIntervalRef = useRef(null);
const leftTabRef = useRef(false);

  const leaveTimeoutRef = useRef(null);
  const autoSubmittedRef = useRef(false);
  const [retryLocked, setRetryLocked] = useState(false);

 const questions = [
  "Explain your understanding of this role basics.",
  "What skills are important for this role?",
  "How would you improve yourself in this role?",
  "Explain a challenge you might face in this role.",
  "Why should a company hire you for this role?"
];

const [questionIndex, setQuestionIndex] = useState(
  Number(localStorage.getItem("questionIndex")) || 0
);

const question = questions[questionIndex];
const submit = ({
  autoSubmitted = false,
  autoSubmitReason = null
} = {}) => {
  console.log("🔥 SUBMIT PAYLOAD", {
    role,
    topic: "Basics",
    question,
    questionIndex,
    answer,
    autoSubmitted,
    autoSubmitReason
  });

  submitAnswer({
    role,
    topic: "Basics",
    question,
  questionIndex: Number(questionIndex),
    answer,
    autoSubmitted,
    autoSubmitReason
  });
};


  const ANSWER_TIME_LIMIT = 240; // 4 minutes
  const [timeLeft, setTimeLeft] = useState(ANSWER_TIME_LIMIT);

  const {
    feedback,
    loading,
    error,
    submitAnswer,
    resetInterview 
  } = useInterview();

  /* ================= AUTO SUBMIT CORE ================= */
  const VALID_REASONS = ["TAB_SWITCH", "PAGE_CLOSE", "TIME_EXPIRED"];
  const autoSubmitTest = (reason) => {
    if (!VALID_REASONS.includes(reason)) return;
    if (autoSubmittedRef.current || loading || !answer || feedback || retryLocked) return;

    autoSubmittedRef.current = true;
 setRetryLocked(true); // 🔒 hard lock retries immediately
    submitAnswer({
      role,
      topic: "Basics",
      question,
      answer,
  questionIndex: Number(questionIndex),
      autoSubmitted: true,
      autoSubmitReason: reason,
    });
  };

  // Handle Retry
  const handleRetry = () => {
  setAnswer("");
  setTimeLeft(ANSWER_TIME_LIMIT);
  autoSubmittedRef.current = false;
  resetInterview(); // clears feedback only
};

// Continue interview
const handleContinue = () => {
  setQuestionIndex((prev) => prev + 1);
  setAnswer("");
  setTimeLeft(ANSWER_TIME_LIMIT);
  autoSubmittedRef.current = false;
};


  /* ================= TIMER (4 MIN) ================= */
  useEffect(() => {
    if (feedback || loading) return;

    if (timeLeft <= 0) {
      autoSubmitTest("TIME_EXPIRED");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, feedback, loading]);

  /* ================= PRESERVE QUESTION INDEX ================= */
  useEffect(() => {
  localStorage.setItem("questionIndex", questionIndex);
}, [questionIndex]);

  /* ================= TAB SWITCH ================= */
  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (document.hidden && !autoSubmittedRef.current) {
  //       setShowLeaveWarning(true);
  //       setLeaveCountdown(10);

  //       leaveTimeoutRef.current = setInterval(() => {
  //         setLeaveCountdown((prev) => {
  //           if (prev <= 1) {
  //             clearInterval(leaveTimeoutRef.current);
  //             autoSubmitTest("TAB_SWITCH");
  //             return 0;
  //           }
  //           return prev - 1;
  //         });
  //       }, 1000);
  //     }

  //     if (!document.hidden) {
  //       setShowLeaveWarning(false);
  //       clearInterval(leaveTimeoutRef.current);
  //     }
  //   };

  //   document.addEventListener("visibilitychange", handleVisibilityChange);
  //   return () => {
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //     clearInterval(leaveTimeoutRef.current);
  //   };
  // }, [answer, loading, feedback]);
  useEffect(() => {
  const handleVisibilityChange = () => {
    if (document.hidden && !autoSubmittedRef.current && !feedback && !loading) {
      setShowLeaveWarning(true);
      leftTabRef.current = true;
      setLeaveCountdown(10);

      leaveIntervalRef.current = setInterval(() => {
        setLeaveCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(leaveIntervalRef.current);
            autoSubmitTest("TAB_SWITCH");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    if (!document.hidden && leftTabRef.current) {
      setShowLeaveWarning(false);
      clearInterval(leaveIntervalRef.current);
    }
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);

  return () => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    clearInterval(leaveIntervalRef.current);
  };
}, [answer,feedback, loading]);


  /* ================= PAGE CLOSE ================= */
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      autoSubmitTest("PAGE_CLOSE");
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [answer]);

  /* ================= DISABLE PASTE ================= */
  useEffect(() => {
    const handlePaste = (e) => {
      e.preventDefault();
      toast.error("Pasting is disabled during the interview");
    };

    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "v") {
        e.preventDefault();
        toast.error("Pasting is disabled during the interview");
      }
    };

    document.addEventListener("paste", handlePaste);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("paste", handlePaste);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /* ================= TOASTS ================= */
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (feedback) toast.success("Interview evaluated successfully!");
  }, [feedback]);

  const currentStep = feedback ? 3 : loading ? 2 : 1;

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">

      {/* HEADER */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
        {role.toUpperCase()} Interview
      </h1>

      {/* STEPS */}
      <ul className="steps steps-horizontal w-full mb-14 text-sm md:text-base font-semibold">
        <li className={`step ${currentStep >= 1 ? "step-primary" : ""}`}>Question</li>
        <li className={`step ${currentStep >= 2 ? "step-primary" : ""}`}>Answer</li>
        <li className={`step ${currentStep >= 3 ? "step-primary" : ""}`}>AI Feedback</li>
      </ul>

      {/* QUESTION */}
      <div className="card bg-base-100 shadow-xl mb-10 border border-base-300">
        <div className="card-body">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">
            Interview Question
          </h2>
          <p className="mt-4 text-2xl md:text-3xl font-medium leading-relaxed">
            {question}
          </p>
        </div>
      </div>

      {/* TIMER */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-semibold uppercase tracking-wide text-base-content/60">
          Time Remaining
        </span>
        <span
          className={`font-mono text-2xl md:text-3xl font-bold ${
            timeLeft <= 30 ? "text-error animate-pulse" : "text-primary"
          }`}
        >
          {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
          {String(timeLeft % 60).padStart(2, "0")}
        </span>
      </div>

      {/* ANSWER */}
      <div className="card bg-base-100 shadow-xl mb-12 border border-base-300">
        <div className="card-body">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-secondary mb-3">
            Your Answer
          </h3>

          <textarea
            className="textarea textarea-bordered w-full min-h-[220px]
                      text-lg leading-relaxed focus:ring-2 focus:ring-primary"
            placeholder="Type your answer here (minimum 20 characters)..."
            value={answer}
            disabled={loading}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <div className="flex flex-col md:flex-row justify-between items-center gap-5 mt-6">
            <span className="text-sm text-base-content/60">
              Tip: Press <kbd className="kbd kbd-sm">Ctrl</kbd> +
              <kbd className="kbd kbd-sm">Enter</kbd> to submit
            </span>

<button
  className="
  w-full md:w-auto
    btn
    btn-primary
    btn-lg
    px-12
    py-4
    text-lg
    font-semibold
    rounded-xl

    /* Visibility */
    bg-primary
    text-primary-content

    /* Hover / Focus */
    hover:brightness-110
    hover:scale-[1.03]
    active:scale-95
    focus:outline-none
    focus:ring-4
    focus:ring-primary/40
    /* Shadow */
    shadow-lg
    hover:shadow-xl
    /* Disabled */
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
  disabled={loading || answer.length < 20 || timeLeft <= 0}
  onClick={() => {
    submitAnswer({
      role,
      topic: "Basics",
      question,
  questionIndex: Number(questionIndex),
      answer
    });
  }}
>
  🚀 Submit Answer
</button>

          </div>
        </div>
      </div>

      {/* FEEDBACK */}
{feedback && (
  <div className="card bg-base-100 shadow-xl border border-base-300 mt-10">
    <div className="card-body space-y-8">

      {/* Header */}
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-bold">AI Feedback</h2>
        <span className="badge badge-primary badge-lg text-lg px-4 py-3">
          Score: {feedback.score}/10
        </span>
      </div>

      {/* Strengths */}
      {feedback.strengths?.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-success mb-3">
            ✅ Strengths
          </h3>
          <div className="flex flex-wrap gap-3">
            {feedback.strengths.map((s, i) => (
              <span
                key={i}
                className="badge badge-success badge-outline px-4 py-2 text-sm"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Improvements */}
      {feedback.improvements?.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-warning mb-3">
            ⚠ Improvements
          </h3>
          <ul className="list-disc ml-6 space-y-2 text-base">
            {feedback.improvements.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Improved Answer */}
      {feedback.improvedAnswer && (
        <div>
          <h3 className="text-2xl font-semibold mb-3">
            ✨ Suggested Improved Answer
          </h3>
          <div className="bg-base-100 p-6 rounded-xl text-base leading-relaxed text-xl">
            {feedback.improvedAnswer}
          </div>
        </div>
      )}

      {/* Follow-up Question */}
      {feedback.followUpQuestion && (
        <div>
          <h3 className="text-xl font-semibold mb-3">
            🔁 Follow-up Question
          </h3>
          <p className="italic text-lg text-base-content/80">
            {feedback.followUpQuestion}
          </p>
        </div>
      )}

      {/* Retry */}
<button
  disabled={retryLocked}
  className="
    btn
    btn-primary
    btn-lg
    px-12
    py-4
    text-lg
    font-semibold
    rounded-xl

    /* Visibility */
    bg-primary
    text-primary-content

    /* Hover / Focus */
    hover:brightness-110
    hover:scale-[1.03]
    active:scale-95
    focus:outline-none
    focus:ring-4
    focus:ring-primary/40

    /* Shadow */
    shadow-lg
    hover:shadow-xl 
  "
      onClick={handleRetry}
      >
       Retry
      </button>

    </div>
  </div>
)}
{showLeaveWarning && (
  <dialog className="modal modal-open">
    <div className="modal-box">
      <h3 className="font-bold text-lg text-warning">
        Leaving Interview
      </h3>

      <p className="mt-3">
        Your answer will be auto-submitted in
      </p>

      <p className="text-4xl font-extrabold text-error mt-2">
        {leaveCountdown}s
      </p>

      <p className="text-sm text-base-content/60 mt-2">
        Return to this tab to continue.
      </p>

      <div className="modal-action">
        <button
          className="btn btn-primary"
onClick={() => {
  clearInterval(leaveIntervalRef.current);
  setShowLeaveWarning(false);

  // Move to next question

const Interview = () => {
  const { state } = useLocation();
  const role = state?.role || "frontend";

  // const question = "Explain your understanding of this role basics.";

  const [answer, setAnswer] = useState("");
  const [showLeaveWarning, setShowLeaveWarning] = useState(false);
  const [leaveCountdown, setLeaveCountdown] = useState(10);

 const leaveIntervalRef = useRef(null);
const leftTabRef = useRef(false);

  const leaveTimeoutRef = useRef(null);
  const autoSubmittedRef = useRef(false);
  const [retryLocked, setRetryLocked] = useState(false);

 const questions = [
  "Explain your understanding of this role basics.",
  "What skills are important for this role?",
  "How would you improve yourself in this role?",
  "Explain a challenge you might face in this role.",
  "Why should a company hire you for this role?"
];

const [questionIndex, setQuestionIndex] = useState(
  Number(localStorage.getItem("questionIndex")) || 0
);

const question = questions[questionIndex];


  const ANSWER_TIME_LIMIT = 240; // 4 minutes
  const [timeLeft, setTimeLeft] = useState(ANSWER_TIME_LIMIT);

  const {
    feedback,
    loading,
    error,
    submitAnswer,
    resetInterview 
  } = useInterview();

  /* ================= AUTO SUBMIT CORE ================= */
  const VALID_REASONS = ["TAB_SWITCH", "PAGE_CLOSE", "TIME_EXPIRED"];
  const autoSubmitTest = (reason) => {
    if (!VALID_REASONS.includes(reason)) return;
    if (autoSubmittedRef.current || loading || !answer || feedback || retryLocked) return;

    autoSubmittedRef.current = true;
 setRetryLocked(true); // 🔒 hard lock retries immediately
    submitAnswer({
      role,
      topic: "Basics",
      question,
      answer,
  questionIndex: Number(questionIndex),
      autoSubmitted: true,
      autoSubmitReason: reason,
    });
  };

  // Handle Retry
  const handleRetry = () => {
  setAnswer("");
  setTimeLeft(ANSWER_TIME_LIMIT);
  autoSubmittedRef.current = false;
  resetInterview(); // clears feedback only
};

// Continue interview
const handleContinue = () => {
  setQuestionIndex((prev) => prev + 1);
  setAnswer("");
  setTimeLeft(ANSWER_TIME_LIMIT);
  autoSubmittedRef.current = false;
};


  /* ================= TIMER (4 MIN) ================= */
  useEffect(() => {
    if (feedback || loading) return;

    if (timeLeft <= 0) {
      autoSubmitTest("TIME_EXPIRED");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, feedback, loading]);

  /* ================= PRESERVE QUESTION INDEX ================= */
  useEffect(() => {
  localStorage.setItem("questionIndex", questionIndex);
}, [questionIndex]);

  /* ================= TAB SWITCH ================= */
  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (document.hidden && !autoSubmittedRef.current) {
  //       setShowLeaveWarning(true);
  //       setLeaveCountdown(10);

  //       leaveTimeoutRef.current = setInterval(() => {
  //         setLeaveCountdown((prev) => {
  //           if (prev <= 1) {
  //             clearInterval(leaveTimeoutRef.current);
  //             autoSubmitTest("TAB_SWITCH");
  //             return 0;
  //           }
  //           return prev - 1;
  //         });
  //       }, 1000);
  //     }

  //     if (!document.hidden) {
  //       setShowLeaveWarning(false);
  //       clearInterval(leaveTimeoutRef.current);
  //     }
  //   };

  //   document.addEventListener("visibilitychange", handleVisibilityChange);
  //   return () => {
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //     clearInterval(leaveTimeoutRef.current);
  //   };
  // }, [answer, loading, feedback]);
  useEffect(() => {
  const handleVisibilityChange = () => {
    if (document.hidden && !autoSubmittedRef.current && !feedback && !loading) {
      setShowLeaveWarning(true);
      leftTabRef.current = true;
      setLeaveCountdown(10);

      leaveIntervalRef.current = setInterval(() => {
        setLeaveCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(leaveIntervalRef.current);
            autoSubmitTest("TAB_SWITCH");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    if (!document.hidden && leftTabRef.current) {
      setShowLeaveWarning(false);
      clearInterval(leaveIntervalRef.current);
    }
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);

  return () => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    clearInterval(leaveIntervalRef.current);
  };
}, [answer,feedback, loading]);


  /* ================= PAGE CLOSE ================= */
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      autoSubmitTest("PAGE_CLOSE");
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [answer]);

  /* ================= DISABLE PASTE ================= */
  useEffect(() => {
    const handlePaste = (e) => {
      e.preventDefault();
      toast.error("Pasting is disabled during the interview");
    };

    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "v") {
        e.preventDefault();
        toast.error("Pasting is disabled during the interview");
      }
    };

    document.addEventListener("paste", handlePaste);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("paste", handlePaste);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /* ================= TOASTS ================= */
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (feedback) toast.success("Interview evaluated successfully!");
  }, [feedback]);

  const currentStep = feedback ? 3 : loading ? 2 : 1;

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
{showLeaveWarning && (
  <dialog className="modal modal-open">
    <div className="modal-box max-w-md">
      <h3 className="font-bold text-xl text-warning">
        Leaving Interview
      </h3>

      <p className="mt-4 text-base">
        Your answer will be auto-submitted in
      </p>

      <p className="text-5xl font-extrabold text-error mt-3">
        {leaveCountdown}s
      </p>

      <p className="text-sm text-base-content/60 mt-3">
        Return to this tab to continue the interview.
      </p>

      <div className="modal-action">
        <button
          className="btn btn-success btn-lg px-8"
          onClick={() => {
            clearInterval(leaveIntervalRef.current);
            setShowLeaveWarning(false);
          }}
        >
          Continue Interview
        </button>
      </div>
    </div>
  </dialog>
)}

      {/* HEADER */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
        {role.toUpperCase()} Interview
      </h1>

      {/* STEPS */}
      <ul className="steps steps-horizontal w-full mb-14 text-sm md:text-base font-semibold">
        <li className={`step ${currentStep >= 1 ? "step-primary" : ""}`}>Question</li>
        <li className={`step ${currentStep >= 2 ? "step-primary" : ""}`}>Answer</li>
        <li className={`step ${currentStep >= 3 ? "step-primary" : ""}`}>AI Feedback</li>
      </ul>

      {/* QUESTION */}
      <div className="card bg-base-100 shadow-xl mb-10 border border-base-300">
        <div className="card-body">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">
            Interview Question
          </h2>
          <p className="mt-4 text-2xl md:text-3xl font-medium leading-relaxed">
            {question}
          </p>
        </div>
      </div>

      {/* TIMER */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-semibold uppercase tracking-wide text-base-content/60">
          Time Remaining
        </span>
        <span
          className={`font-mono text-2xl md:text-3xl font-bold ${
            timeLeft <= 30 ? "text-error animate-pulse" : "text-primary"
          }`}
        >
          {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
          {String(timeLeft % 60).padStart(2, "0")}
        </span>
      </div>

      {/* ANSWER */}
      <div className="card bg-base-100 shadow-xl mb-12 border border-base-300">
        <div className="card-body">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-secondary mb-3">
            Your Answer
          </h3>

          <textarea
            className="textarea textarea-bordered w-full min-h-[220px]
                      text-lg leading-relaxed focus:ring-2 focus:ring-primary"
            placeholder="Type your answer here (minimum 20 characters)..."
            value={answer}
            disabled={loading}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <div className="flex flex-col md:flex-row justify-between items-center gap-5 mt-6">
            <span className="text-sm text-base-content/60">
              Tip: Press <kbd className="kbd kbd-sm">Ctrl</kbd> +
              <kbd className="kbd kbd-sm">Enter</kbd> to submit
            </span>

<button
  className="
  w-full md:w-auto
    btn
    btn-primary
    btn-lg
    px-12
    py-4
    text-lg
    font-semibold
    rounded-xl

    /* Visibility */
    bg-primary
    text-primary-content

    /* Hover / Focus */
    hover:brightness-110
    hover:scale-[1.03]
    active:scale-95
    focus:outline-none
    focus:ring-4
    focus:ring-primary/40
    /* Shadow */
    shadow-lg
    hover:shadow-xl
    /* Disabled */
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
  disabled={loading || answer.length < 20 || timeLeft <= 0}
  onClick={() => {
    submitAnswer({
      role,
      topic: "Basics",
      question,
  questionIndex: Number(questionIndex),
      answer
    });
  }}
>
  🚀 Submit Answer
</button>

          </div>
        </div>
      </div>

      {/* FEEDBACK */}
{feedback && (
  <div className="card bg-base-100 shadow-xl border border-base-300 mt-10">
    <div className="card-body space-y-8">

      {/* Header */}
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-bold">AI Feedback</h2>
        <span className="badge badge-primary badge-lg text-lg px-4 py-3">
          Score: {feedback.score}/10
        </span>
      </div>

      {/* Strengths */}
      {feedback.strengths?.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-success mb-3">
            ✅ Strengths
          </h3>
          <div className="flex flex-wrap gap-3">
            {feedback.strengths.map((s, i) => (
              <span
                key={i}
                className="badge badge-success badge-outline px-4 py-2 text-sm"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Improvements */}
      {feedback.improvements?.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-warning mb-3">
            ⚠ Improvements
          </h3>
          <ul className="list-disc ml-6 space-y-2 text-base">
            {feedback.improvements.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Improved Answer */}
      {feedback.improvedAnswer && (
        <div>
          <h3 className="text-2xl font-semibold mb-3">
            ✨ Suggested Improved Answer
          </h3>
          <div className="bg-base-100 p-6 rounded-xl text-base leading-relaxed text-xl">
            {feedback.improvedAnswer}
          </div>
        </div>
      )}

      {/* Follow-up Question */}
      {feedback.followUpQuestion && (
        <div>
          <h3 className="text-xl font-semibold mb-3">
            🔁 Follow-up Question
          </h3>
          <p className="italic text-lg text-base-content/80">
            {feedback.followUpQuestion}
          </p>
        </div>
      )}

      {/* Retry */}
<button
  disabled={retryLocked}
  className="
    btn
    btn-primary
    btn-lg
    px-12
    py-4
    text-lg
    font-semibold
    rounded-xl

    /* Visibility */
    bg-primary
    text-primary-content

    /* Hover / Focus */
    hover:brightness-110
    hover:scale-[1.03]
    active:scale-95
    focus:outline-none
    focus:ring-4
    focus:ring-primary/40

    /* Shadow */
    shadow-lg
    hover:shadow-xl 
  "
     onClick={() => {
    setQuestionIndex((prev) => prev + 1);
    setAnswer("");
    setTimeLeft(ANSWER_TIME_LIMIT);
    autoSubmittedRef.current = false;
    setRetryLocked(false);
    resetInterview();
  }}
>
       Next Question
      </button>

    </div>
  </div>
)}
{showLeaveWarning && (
  <dialog className="modal modal-open">
    <div className="modal-box">
      <h3 className="font-bold text-lg text-warning">
        Leaving Interview
      </h3>

      <p className="mt-3">
        Your answer will be auto-submitted in
      </p>

      <p className="text-4xl font-extrabold text-error mt-2">
        {leaveCountdown}s
      </p>

      <p className="text-sm text-base-content/60 mt-2">
        Return to this tab to continue.
      </p>

      <div className="modal-action">
        <button
          className="btn btn-primary"
onClick={() => {
  clearInterval(leaveIntervalRef.current);
  setShowLeaveWarning(false);

  // Move to next question
  setQuestionIndex((prev) => prev + 1);
  setAnswer("");
  setTimeLeft(ANSWER_TIME_LIMIT);
  autoSubmittedRef.current = false;
}}

        >
          Continue Interview
        </button>
      </div>
    </div>
  </dialog>
)} 

    </div>
  );
};

}}

        >
          Continue Interview
        </button>
      </div>
    </div>
  </dialog>
)} 

    </div>
  );
};

export default Interview;
