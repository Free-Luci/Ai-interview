import { useLocation } from "react-router-dom";
import { useState } from "react";
import useInterview from "../hooks/useInterview";

const Interview = () => {
  const { state } = useLocation();
  const role = state?.role || "frontend";

  const [answer, setAnswer] = useState("");

  const {
    feedback,
    loading,
    error,
    submitAnswer,
    resetInterview
  } = useInterview();

  const question = "Explain your understanding of this role basics.";

  const handleSubmit = () => {
    submitAnswer({
      role,
      topic: "Basics",
      question,
      answer
    });
  };

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">
        {role.toUpperCase()} Interview
      </h1>

      {/* Question */}
      <div className="card bg-base-100 shadow mb-6">
        <div className="card-body">
          <h2 className="card-title">Question</h2>
          <p>{question}</p>
        </div>
      </div>

      {/* Answer */}
      <div className="card bg-base-100 shadow mb-6">
        <div className="card-body">
          <textarea
            className="textarea textarea-bordered w-full h-40"
            placeholder="Type your answer here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <button
            className="btn btn-primary mt-4 w-40"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Evaluating..." : "Submit Answer"}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="alert alert-error mb-4">
          {error}
        </div>
      )}

      {/* Feedback */}
      {feedback && (
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">
              Feedback (Score: {feedback.score}/10)
            </h2>

            <p><strong>Strengths:</strong></p>
            <ul className="list-disc ml-6">
              {feedback.strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>

            <p className="mt-3"><strong>Improvements:</strong></p>
            <ul className="list-disc ml-6">
              {feedback.improvements.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>

            <p className="mt-3">
              <strong>Improved Answer:</strong>
            </p>
            <p>{feedback.improvedAnswer}</p>

            <p className="mt-3">
              <strong>Follow-up Question:</strong>
            </p>
            <p>{feedback.followUpQuestion}</p>

            <button
              className="btn btn-outline mt-4"
              onClick={resetInterview}
            >
              Try Another Answer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interview;
