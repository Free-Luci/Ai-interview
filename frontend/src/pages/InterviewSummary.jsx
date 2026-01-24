import { useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const InterviewSummary = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  // ------------FETCH SUMMARY---------------
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await api.get("/api/interview/summary");
        setSummary(res.data.summary);
      } catch (err) {
        console.error("SUMMARY ERROR:", err);
        toast.error("Failed to load interview summary");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  // -----------------RESET HANDLER______________
  const handleReset = async () => {
  const confirmReset = window.confirm(
    "Are you sure you want to reset your interview history? This cannot be undone."
  );

  if (!confirmReset) return;

  try {
    await api.delete("/api/interview/summary/reset");
    toast.success("Interview summary reset!");

    // Reset UI immediately
    setSummary({
      role: null,
      totalQuestions: 0,
      averageScore: 0,
      autoSubmissions: 0,
      attempts: [],
    });
  } catch (err) {
    console.error("RESET ERROR:", err);
    toast.error("Failed to reset interview summary");
  }
};
// ---------------------LOADING STATE------------------
  if (loading) return <p className="text-center mt-20">Loading...</p>;

  // if (!summary || summary.totalQuestions === 0) {
  //   return <p className="text-center mt-20">No interview attempts yet.</p>;
  // }


  const attempts = summary.attempts;   // ✅ FIX HERE
// GRAPH DATA
const chartData = {
  labels: attempts.map((a, i) => `Q${i + 1}`),
  datasets: [
    {
      label: "Score per Question",
      data: attempts.map((a) => a.score),
      backgroundColor: "#3b82f6",
      borderRadius: 6,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: {
      display: true,
      text: "Interview Performance",
    },
  },
  scales: {
    y: {
      min: 0,
      max: 10,
      ticks: { stepSize: 1 },
    },
  },
};

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">

      {/* HEADER */}
<div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
  <div>
    <h1 className="text-4xl font-extrabold mb-2">
      📊 Interview Summary Dashboard
    </h1>
    <p className="text-base-content/60">
      Review all your interview attempts and performance
    </p>
  </div>

  {/* RESET BUTTON (always visible)*/}
  <button
    onClick={handleReset}
    className="
      btn btn-error btn-outline px-6 py-3 text-base font-semibold rounded-xl
      hover:scale-[1.03]
      active:scale-95
      focus:ring-4 focus:ring-error/30
      transition-all duration-200
    "
  >
    🔄 Reset Interview
  </button>
</div>

  {/* Empty state UI */}
{summary.totalQuestions === 0 && (
  <div className="text-center mt-20 text-base-content/60">
    No interview attempts yet.
  </div>
)}

      {/* ONLY SHOW BELOW IF THERE IS DATA */}
      {summary.totalQuestions > 0 && (
        <>
      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="card bg-base-100 shadow border border-base-300">
          <div className="card-body text-center">
            <h3 className="text-sm uppercase text-base-content/60">Total Attempts</h3>
            <p className="text-4xl font-bold mt-2">{summary.totalQuestions}</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow border border-base-300">
          <div className="card-body text-center">
            <h3 className="text-sm uppercase text-base-content/60">Auto Submits</h3>
            <p className="text-4xl font-bold mt-2 text-warning">
              {summary.autoSubmissions}
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow border border-base-300">
          <div className="card-body text-center">
            <h3 className="text-sm uppercase text-base-content/60">Average Score</h3>
            <p className="text-4xl font-bold mt-2 text-success">
              {summary.averageScore}
            </p>
          </div>
        </div>

      </div>
{/* PERFORMANCE GRAPH */}
<div className="card bg-base-100 shadow border border-base-300 mb-10">
  <div className="card-body">
    <h3 className="text-xl font-bold mb-4">📈 Performance Graph</h3>
    <Bar data={chartData} options={chartOptions} />
  </div>
</div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="text-base">
              <th>#</th>
              <th>Question</th>
              <th>Score</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {attempts.map((a, idx) => (
              <tr key={idx} className="hover">
                <td>{idx + 1}</td>

                <td className="max-w-xs truncate">{a.question}</td>

                <td>
                  <span
                    className={`badge ${
                      a.score >= 7
                        ? "badge-success"
                        : a.score >= 4
                        ? "badge-warning"
                        : "badge-error"
                    }`}
                  >
                    {a.score}/10
                  </span>
                </td>

                <td>
                  {a.autoSubmitted ? (
                    <span className="badge badge-warning">Auto</span>
                  ) : (
                    <span className="badge badge-success">Manual</span>
                  )}
                </td>

                <td>
                  {a.autoSubmitReason ? (
                    <span className="text-xs text-error font-semibold">
                      {a.autoSubmitReason}
                    </span>
                  ) : (
                    "-"
                  )}
                </td>

                <td className="text-sm text-base-content/60">
                  {new Date(a.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
          </>
      )}
    </div>
  );
};

export default InterviewSummary;
