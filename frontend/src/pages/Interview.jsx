// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { toast } from 'react-hot-toast';
import useInterview from '../hooks/useInterview';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const questions = [
  "Explain your understanding of this role basics.",
  "What skills are important for this role?",
  "How would you improve yourself in this role?",
  "Explain a challenge you might face in this role.",
  "Why should a company hire you for this role?"
];

const Interview = () => {
  const role = "frontend";
  const topic = "Basics";
const navigate = useNavigate();

  const [questionIndex, setQuestionIndex] = useState(0);
  const question = questions[questionIndex];

  const [answer, setAnswer] = useState("");
  const [showLeaveWarning, setShowLeaveWarning] = useState(false);
  const [leaveCountdown, setLeaveCountdown] = useState(10);

  const countdownIntervalRef = useRef(null);
  const autoSubmittedRef = useRef(false);
  const isTabSwitchActiveRef = useRef(false);
  const isSubmittingRef = useRef(false);
  const lastKeyPressTimeRef = useRef(Date.now());
  const answerHistoryRef = useRef([]); // Track answer history for anti-cheat
  const pasteAttemptsRef = useRef(0);

  const { feedback, loading, error, submitAnswer, resetInterview } = useInterview();

  /* ---------------- CLEANUP TIMERS ---------------- */
  const cleanupTimers = useCallback(() => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    isTabSwitchActiveRef.current = false;
  }, []);

  /* ---------------- SUBMIT FUNCTION ---------------- */
 const handleSubmit = useCallback(async (auto = false, reason = null) => {
  if (autoSubmittedRef.current || isSubmittingRef.current || answer.length < 20) return;

  isSubmittingRef.current = true;

  cleanupTimers();
  setShowLeaveWarning(false);
  setLeaveCountdown(10);

  autoSubmittedRef.current = true;

  const result = await submitAnswer({
    role,
    topic,
    question,
    questionIndex,
    answer,
    autoSubmitted: auto,
    autoSubmitReason: reason
  });

  if (result?.interviewCompleted) {
    toast.success("Interview completed! Redirecting to summary...");
    setTimeout(() => {
      window.location.href = "/interview/summary";
    }, 1200);
  }

      isSubmittingRef.current = false;
  }, [role, topic, question, questionIndex, answer, submitAnswer, cleanupTimers]);

  /* ---------------- COUNTDOWN FUNCTION ---------------- */
const startCountdown = useCallback(() => {
  cleanupTimers();

  // Always reset UI first
  setLeaveCountdown(10);
  setShowLeaveWarning(true);

  countdownIntervalRef.current = setInterval(() => {
    setLeaveCountdown((prev) => {
      console.log("⏱ Countdown:", prev -1);//

      if (prev <= 1) {
        // Time finished
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
          // setShowLeaveWarning(false); //

        if (!autoSubmittedRef.current) {
          console.log("🚨 Auto submitting due to TAB SWITCH");
          handleSubmit(true, "TAB_SWITCH");
        }

        setShowLeaveWarning(false);
        isTabSwitchActiveRef.current = false;
        return 0;
      }

      return prev - 1;
    });
  }, 1000);
}, [cleanupTimers, handleSubmit]);


  /* ---------------- ANTI-CHEAT: PREVENT COPY/PASTE ---------------- */
  const handleAnswerChange = (e) => {
    if (!loading && !feedback) {
      const newValue = e.target.value;
      const oldValue = answer;
      
      // Detect large pastes (more than 5 characters added at once)
      if (newValue.length - oldValue.length > 5) {
        pasteAttemptsRef.current++;
        
        // Show warning toast for paste attempts
        toast.error(`Copy-paste detected! This is attempt ${pasteAttemptsRef.current}. Please type your own answer.`);
        
        // If too many paste attempts, auto-submit with penalty
        if (pasteAttemptsRef.current >= 3) {
          toast.error("Multiple paste attempts detected. Your answer will be auto-submitted.");
          autoSubmittedRef.current = true;
          submitAnswer({
            role,
            topic,
            question,
            questionIndex,
            answer: oldValue,
            autoSubmitted: true,
            autoSubmitReason: "COPY_PASTE_DETECTED"
          });
          return;
        }
        
        // Revert to previous value
        e.target.value = oldValue;
        return;
      }
      
      // Track typing speed for anti-cheat
      const now = Date.now();
      const timeDiff = now - lastKeyPressTimeRef.current;
      lastKeyPressTimeRef.current = now;
      
      // If typing is too fast (less than 50ms between characters), suspect copy-paste
      if (timeDiff < 50 && newValue.length > oldValue.length) {
        toast.warning("Typing too fast detected. Please type naturally.");
      }
      
      setAnswer(newValue);
      
      // Store answer history for pattern detection
      answerHistoryRef.current.push({
        time: now,
        length: newValue.length,
        change: newValue.length - oldValue.length
      });
      
      // Keep only last 20 entries
      if (answerHistoryRef.current.length > 20) {
        answerHistoryRef.current.shift();
      }
    }
  };

  /* ================= AUTO REDIRECT TO SUMMARY ================= */
useEffect(() => {
  if (!feedback) return;

  // If this was last question OR auto submitted → go to summary
  const isLastQuestion = questionIndex === questions.length - 1;

  if (isLastQuestion || feedback.autoSubmitted) {
    toast.success("Interview completed! Redirecting to summary...");

    setTimeout(() => {
      navigate("/interview/summary");
    }, 1200);
  }
}, [feedback]);

  /* ---------------- PREVENT COPY/PASTE EVENTS ---------------- */
  useEffect(() => {
    const handlePaste = (e) => {
      // Only prevent paste in the answer textarea
      if (e.target.tagName === 'TEXTAREA' && e.target.className.includes('textarea')) {
        e.preventDefault();
        toast.error("Paste is disabled. Please type your own answer.");
        return false;
      }
    };

    const handleCopy = (e) => {
      // Allow copying from other areas, but not the question text
      if (e.target.closest('.card-body')) {
        toast.warning("Copying interview content is not allowed.");
        e.preventDefault();
        return false;
      }
    };

    // Add context menu prevention
    const handleContextMenu = (e) => {
      if (e.target.tagName === 'TEXTAREA') {
        e.preventDefault();
        toast.warning("Right-click menu is disabled in the answer area.");
        return false;
      }
    };

    document.addEventListener('paste', handlePaste);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  /* ---------------- CTRL + ENTER ---------------- */
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.key === "Enter" && answer.length >= 20 && !loading && !feedback) {
        e.preventDefault();
        handleSubmit(false, null);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [answer, loading, feedback, handleSubmit]);

  /* ---------------- TAB SWITCH DETECTION ---------------- */
  useEffect(() => {
    const handleVisibilityChange = () => {
      // Don't handle if already submitted or no answer
      if (autoSubmittedRef.current || feedback || loading || answer.length < 20) {
        cleanupTimers();
        setShowLeaveWarning(false);
        return;
      }

      if (document.hidden) {
        // User switched away or minimized - start countdown
        console.log("Tab switched away - starting countdown");
        isTabSwitchActiveRef.current = true;
        // setShowLeaveWarning(true);
        startCountdown();
      } else {
        // User returned - stop countdown if it was active
        if (isTabSwitchActiveRef.current) {
          console.log("Tab returned - stopping countdown");
          cleanupTimers();
          setShowLeaveWarning(false);
          isTabSwitchActiveRef.current = false;
        }
      }
    };

    const handleWindowBlur = (e) => {
      // Check if blur is caused by switching to another app or tab
      if (e.target === window && !document.hidden) {
        console.log("Window blur detected - switching to another app");
        if (!autoSubmittedRef.current && !feedback && !loading && answer.length >= 20) {
          isTabSwitchActiveRef.current = true;
          setShowLeaveWarning(true);
          startCountdown();
        }
      }
    };

    const handleWindowFocus = () => {
      console.log("Window focus regained");
      if (isTabSwitchActiveRef.current) {
        cleanupTimers();
        setShowLeaveWarning(false);
        isTabSwitchActiveRef.current = false;
      }
    };

    // Add multiple event listeners for better detection
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);
    
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
      cleanupTimers();
    };
  }, [answer, feedback, loading, cleanupTimers, startCountdown]);

  /* ---------------- PAGE CLOSE AUTO SUBMIT ---------------- */
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      // Only auto-submit if conditions are met
      if (!autoSubmittedRef.current && answer.length >= 20 && !feedback && !loading) {
        // Use sendBeacon for better reliability
        const blob = new Blob([JSON.stringify({
          role,
          topic,
          question,
          questionIndex,
          answer,
          autoSubmitted: true,
          autoSubmitReason: "PAGE_CLOSE"
        })], { type: 'application/json' });
        
        // Try to send beacon
        navigator.sendBeacon('/api/submit-answer', blob);
      }
      
      // Always show browser warning
      if (!autoSubmittedRef.current && answer.length >= 20) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [answer, feedback, loading, role, topic, question, questionIndex]);

  /* ---------------- ERRORS & SUCCESS ---------------- */
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (feedback) toast.success("Answer evaluated successfully!");
  }, [feedback]);

  /* ---------------- RETRY SAME QUESTION ---------------- */
  const handleRetry = () => {
    cleanupTimers();
    setShowLeaveWarning(false);
    autoSubmittedRef.current = false;
    isSubmittingRef.current = false;
    setAnswer("");
    pasteAttemptsRef.current = 0;
    answerHistoryRef.current = [];
    resetInterview();
  };

  /* ---------------- CONTINUE TO NEXT QUESTION ---------------- */
  const handleContinue = () => {
    cleanupTimers();
    setShowLeaveWarning(false);
    autoSubmittedRef.current = false;
    isSubmittingRef.current = false;
    setAnswer("");
    pasteAttemptsRef.current = 0;
    answerHistoryRef.current = [];
    resetInterview();
    
 // LAST QUESTION → REDIRECT TO SUMMARY
  if (questionIndex >= questions.length - 1) {
    toast.success("Interview completed! Redirecting to summary... 🎉");

    setTimeout(() => {
      navigate("/interview/summary");
    }, 1200);

    return;
  }

  // ELSE NEXT QUESTION
  setQuestionIndex(prev => prev + 1);
};
  /* ---------------- HANDLE MODAL RETURN BUTTON ---------------- */
  const handleModalReturn = () => {
    console.log("Modal return button clicked");
    cleanupTimers();
    setShowLeaveWarning(false);
    isTabSwitchActiveRef.current = false;
    
    // Focus back on textarea
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.focus();
    }
  };

  /* ---------------- RESET ON QUESTION CHANGE ---------------- */
  useEffect(() => {
    // Reset submission state when question changes
    cleanupTimers();
    setShowLeaveWarning(false);
    autoSubmittedRef.current = false;
    isSubmittingRef.current = false;
    isTabSwitchActiveRef.current = false;
    pasteAttemptsRef.current = 0;
    answerHistoryRef.current = [];
  }, [questionIndex, cleanupTimers]);

  /* ---------------- DISABLE SHORTCUTS ---------------- */
  useEffect(() => {
    const disableShortcuts = (e) => {
      // Disable Ctrl+V, Ctrl+C, Ctrl+X in textarea
      if (e.target.tagName === 'TEXTAREA') {
        if ((e.ctrlKey || e.metaKey) && (e.key === 'v' || e.key === 'c' || e.key === 'x')) {
          e.preventDefault();
          toast.error(`Ctrl+${e.key.toUpperCase()} is disabled. Please type your own answer.`);
          return false;
        }
      }
    };

    document.addEventListener('keydown', disableShortcuts);
    return () => document.removeEventListener('keydown', disableShortcuts);
  }, []);

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">
          {role.toUpperCase()} Interview
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-base-content/70">
          <span className="badge badge-primary">Topic: {topic}</span>
          <span className="badge badge-outline">
            Question {questionIndex + 1} of {questions.length}
          </span>
          {answer.length > 0 && !feedback && (
            <span className={`badge ${answer.length >= 20 ? 'badge-success' : 'badge-warning'}`}>
              {answer.length} characters {answer.length < 20 && `(${20 - answer.length} more needed)`}
            </span>
          )}
          {showLeaveWarning && (
            <span className="badge badge-error animate-pulse">
              ⚠️ Tab Switch Detected
            </span>
          )}
          {pasteAttemptsRef.current > 0 && (
            <span className="badge badge-warning">
              Paste Attempts: {pasteAttemptsRef.current}
            </span>
          )}
        </div>
        <p className="text-sm text-warning mt-2">
          ⚠️ Note: Copy-paste is disabled. Please type your own answers.
        </p>
      </div>

      {/* QUESTION */}
      <div className="card bg-base-100 shadow-xl mb-8 border border-base-300">
        <div className="card-body">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">
              Interview Question
            </h2>
            <div className="text-sm font-medium bg-base-200 px-3 py-1 rounded-lg">
              {questionIndex + 1}/{questions.length}
            </div>
          </div>
          <p className="mt-4 text-2xl font-medium leading-relaxed select-none">
            {question}
          </p>
        </div>
      </div>

      {/* ANSWER */}
      {!feedback && (
        <div className="card bg-base-100 shadow-xl mb-10 border border-base-300">
          <div className="card-body">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-secondary">
                Your Answer
              </h3>
              <div className="flex items-center gap-4">
                <div className="text-sm">
                  <span className={`font-medium ${answer.length < 20 ? 'text-warning' : 'text-success'}`}>
                    {answer.length}/20
                  </span>
                  <span className="text-base-content/60 ml-2">characters</span>
                </div>
                {pasteAttemptsRef.current > 0 && (
                  <div className="text-xs text-warning">
                    ⚠️ {3 - pasteAttemptsRef.current} attempts remaining
                  </div>
                )}
              </div>
            </div>

            <textarea
              className="textarea textarea-bordered w-full min-h-[220px]
                         text-lg leading-relaxed focus:ring-2 focus:ring-primary
                         transition-all duration-200 select-none"
              placeholder="Type your answer here (minimum 20 characters)... Copy-paste is disabled."
              value={answer}
              disabled={loading}
              onChange={handleAnswerChange}
              onKeyDown={(e) => {
                // Prevent newline on Ctrl+Enter
                if (e.ctrlKey && e.key === 'Enter') {
                  e.preventDefault();
                }
              }}
              onPaste={(e) => {
                e.preventDefault();
                toast.error("Paste is disabled. Please type your own answer.");
              }}
              onCopy={(e) => {
                e.preventDefault();
                toast.warning("Copying is disabled in the answer area.");
              }}
              onCut={(e) => {
                e.preventDefault();
                toast.warning("Cut is disabled in the answer area.");
              }}
            />

            <div className="flex flex-col md:flex-row justify-between items-center gap-5 mt-6">
              <div className="flex items-center gap-3">
                <span className="text-sm text-base-content/60">
                  Press <kbd className="kbd kbd-sm">Ctrl</kbd> +
                  <kbd className="kbd kbd-sm">Enter</kbd> to submit
                </span>
                {answer.length > 0 && answer.length < 20 && (
                  <span className="text-sm text-warning font-medium">
                    Minimum 20 characters required
                  </span>
                )}
              </div>

<button
  disabled={loading || answer.length < 20}
  onClick={() => handleSubmit(false, null)}
  className={`
    w-full md:w-auto
    btn btn-lg px-12 py-4 text-lg font-semibold rounded-xl
    shadow-lg transition-all duration-200
    focus:outline-none focus:ring-4

    ${
      loading
        ? "bg-warning text-warning-content hover:bg-warning cursor-wait"
        : answer.length < 20
        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
        : "btn-primary hover:brightness-110 hover:scale-[1.04] hover:shadow-xl"
    }

    active:scale-95
  `}
>
  {loading ? (
    <>
      <span className="loading loading-spinner loading-sm mr-2"></span>
      Submitting...
    </>
  ) : (
    "🚀 Submit Answer"
  )}
</button>

            </div>
          </div>
        </div>
      )}

      {/* AI FEEDBACK */}
      {feedback && (
        <div className="card bg-base-100 shadow-xl border border-base-300 mt-10 animate-fadeIn">
          <div className="card-body space-y-8">

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-base-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-2xl">
                  <span className="text-3xl">🤖</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold">AI Feedback</h2>
                  <p className="text-base-content/60 mt-1">
                    Question {questionIndex + 1} of {questions.length}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="badge badge-primary badge-lg text-lg px-4 py-3">
                  Score: {feedback.score}/10
                </span>
                {feedback.autoSubmitted && (
                  <span className="badge badge-warning badge-outline">
                    Auto-submitted
                  </span>
                )}
                {feedback.autoSubmitReason === "COPY_PASTE_DETECTED" && (
                  <span className="badge badge-error badge-outline">
                    Copy-paste Detected
                  </span>
                )}
              </div>
            </div>

            {/* STRENGTHS */}
            {feedback.strengths?.length > 0 && (
              <div className="bg-success/5 p-6 rounded-2xl border border-success/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-success/20 rounded-lg">
                    <span className="text-2xl">✅</span>
                  </div>
                  <h3 className="text-xl font-semibold text-success">
                    Strengths
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {feedback.strengths.map((s, i) => (
                    <span
                      key={i}
                      className="badge badge-success px-4 py-2.5 text-sm font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* IMPROVEMENTS */}
            {feedback.improvements?.length > 0 && (
              <div className="bg-warning/5 p-6 rounded-2xl border border-warning/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-warning/20 rounded-lg">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <h3 className="text-xl font-semibold text-warning">
                    Areas for Improvement
                  </h3>
                </div>
                <ul className="space-y-3">
                  {feedback.improvements.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-warning mt-1">•</span>
                      <span className="text-base leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* IMPROVED ANSWER */}
            {feedback.improvedAnswer && (
              <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h3 className="text-xl font-semibold">
                    Suggested Improved Answer
                  </h3>
                </div>
                <div className="bg-base-100 p-5 rounded-xl text-base leading-relaxed border border-base-300">
                  {feedback.improvedAnswer}
                </div>
              </div>
            )}

            {/* FOLLOW UP */}
            {feedback.followUpQuestion && (
              <div className="bg-info/5 p-6 rounded-2xl border border-info/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-info/20 rounded-lg">
                    <span className="text-2xl">🔁</span>
                  </div>
                  <h3 className="text-xl font-semibold text-info">
                    Follow-up Question
                  </h3>
                </div>
                <p className="italic text-lg text-base-content/80 bg-base-100 p-5 rounded-xl border border-base-300">
                  {feedback.followUpQuestion}
                </p>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex flex-col md:flex-row gap-4 justify-center pt-8 border-t border-base-300">
              {/* RETRY */}
              <button
                className="
                  btn btn-outline btn-lg px-8 py-4 text-lg font-semibold rounded-xl
                  hover:scale-[1.03] active:scale-95
                  focus:ring-4 focus:ring-primary/30
                  transition-all duration-200
                  flex-1 md:flex-none
                "
                onClick={handleRetry}
              >
                <span className="mr-2">🔄</span>
                Retry Same Question
              </button>

              {/* CONTINUE */}
              {questionIndex < questions.length - 1 ? (
                <button
                  className="
                    btn btn-primary btn-lg px-8 py-4 text-lg font-semibold rounded-xl
                    hover:brightness-110 hover:scale-[1.04]
                    active:scale-95
                    focus:ring-4 focus:ring-primary/40
                    shadow-lg hover:shadow-xl
                    transition-all duration-200
                    flex-1 md:flex-none
                  "
                  onClick={handleContinue}
                >
                  <span className="mr-2">➡</span>
                  Next Question
                </button>
              ) : (
                <button
                  className="
                    btn btn-success btn-lg px-8 py-4 text-lg font-semibold rounded-xl
                    hover:brightness-110 hover:scale-[1.04]
                    active:scale-95
                    focus:ring-4 focus:ring-success/40
                    shadow-lg hover:shadow-xl
                    transition-all duration-200
                    flex-1 md:flex-none
                  "
                  onClick={() => {
                    toast.success("Interview completed successfully! 🎉");
                    // Handle interview completion logic here
                  }}
                >
                  <span className="mr-2">🎉</span>
                  Complete Interview
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* LEAVE WARNING MODAL */}
      {showLeaveWarning && (
        <div className="modal modal-open">
          <div className="modal-box text-center max-w-md animate-scaleIn">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-warning/20 flex items-center justify-center">
                <span className="text-3xl">⚠️</span>
              </div>
              <h3 className="font-bold text-2xl text-warning mb-2">
                Warning: Tab Switch Detected
              </h3>
              <p className="text-base-content/70">
                Please return to continue the interview
              </p>
            </div>

            <div className="my-8">
              <div className={`text-6xl font-black mb-2 font-mono ${leaveCountdown <= 3 ? 'text-error' : 'text-warning'}`}>
                {leaveCountdown}
              </div>
              <p className="text-sm text-base-content/60">
                {leaveCountdown === 1 ? 'Last second!' : 'seconds remaining'}
              </p>
              <div className="w-full bg-base-300 h-2 rounded-full mt-4 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ease-linear ${leaveCountdown <= 3 ? 'bg-error' : 'bg-warning'}`}
                  style={{ width: `${((10 - leaveCountdown) / 10) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-base-content/80 text-sm">
                {leaveCountdown <= 5 
                  ? `Answer will auto-submit in ${leaveCountdown} second${leaveCountdown !== 1 ? 's' : ''}...`
                  : 'Return to continue answering'}
              </p>
              <div className="modal-action justify-center mt-6">
                <button
                  className="
                    btn btn-success btn-lg px-8 w-full
                    hover:scale-[1.02] active:scale-95
                    transition-transform duration-200
                  "
                  onClick={handleModalReturn}
                  autoFocus
                >
                  <span className="mr-2">←</span>
                  Return to Interview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <button
  className="btn btn-info btn-lg mt-6"
  onClick={() => navigate("/interview/summary")}
>
  📊 View Interview Summary
</button>

    </div>
  );
};
export default Interview;