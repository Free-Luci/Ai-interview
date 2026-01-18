import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";

const InterviewSummary = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get("/interview/summary");
        setSummary(res.data.summary);
      } catch (err) {
        toast.error(
          err?.response?.data?.message ||
          "Failed to load interview summary"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-10">
        <div className="skeleton h-8 w-60 mb-6" />
        <div className="skeleton h-24 w-full mb-4" />
        <div className="skeleton h-24 w-full" />
      </div>
    );
  }

  if (!summary) return null;

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10">

      {/* HEADER */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8">
        Interview Summary
      </h1>

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <StatCard label="Role" value={summary.role.toUpperCase()} />
        <StatCard label="Questions" value={summary.totalQuestions} />
        <StatCard label="Avg Score" value={summary.averageScore} />
        <StatCard
          label="Auto-Submits"
          value={summary.autoSubmissions}
          danger
        />
      </div>

      {/* TABLE */}
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="text-2xl font-bold mb-6">
            Question Breakdown
          </h2>

          <div className="overflow-x-auto">
            <table className="table table-zebra text-base">
              <thead>
                <tr className="text-base font-semibold">
                  <th>#</th>
                  <th>Question</th>
                  <th>Score</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {summary.attempts.map((a) => (
                  <tr key={a.questionIndex}>
                    <td>{a.questionIndex + 1}</td>
                    <td className="max-w-xl">{a.question}</td>
                    <td>
                      <span className="badge badge-primary badge-lg">
                        {a.score}/10
                      </span>
                    </td>
                    <td>
                      {a.autoSubmitted ? (
                        <span className="badge badge-error badge-outline">
                          Auto ({a.autoSubmitReason})
                        </span>
                      ) : (
                        <span className="badge badge-success badge-outline">
                          Manual
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

/* =====================
   STAT CARD
===================== */
const StatCard = ({ label, value, danger }) => (
  <div
    className={`
      card
      shadow-xl
      border
      border-base-300
      ${
        danger
          ? "bg-error/10 text-error"
          : "bg-base-100"
      }
    `}
  >
    <div className="card-body text-center">
      <p className="uppercase tracking-widest text-sm opacity-70">
        {label}
      </p>
      <p className="text-4xl font-extrabold mt-2">
        {value}
      </p>
    </div>
  </div>
);

export default InterviewSummary;
