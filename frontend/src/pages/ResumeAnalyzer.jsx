import { useState } from "react";
import api from "../utils/axiosInstance";
import toast from "react-hot-toast";

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [preview, setPreview] = useState("");
const [feedback, setFeedback] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    if (selected.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }

    setFile(selected);
  };
  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a resume PDF first");
      return;
    }

    const formData = new FormData();

    // 🔥 ANY FIELD NAME WILL WORK (backend uses upload.any())
    formData.append("resume", file);   // name doesn't matter now

    try {
      setLoading(true);

      const res = await api.post("/api/resume/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Resume analyzed successfully!");
      // setPreview(res.data.preview);
      setFeedback(res.data.feedback);

    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      toast.error(err.response?.data?.message || "Resume upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="card bg-base-100 shadow-xl w-full max-w-xl">

        <div className="card-body space-y-6">

          <h2 className="text-3xl font-bold text-center">
            📄 AI Resume Analyzer
          </h2>

          <p className="text-center text-base-content/70">
            Upload your resume (PDF) and get instant AI feedback
          </p>

          {/* FILE INPUT */}
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full"
          />

          {file && (
            <p className="text-sm text-success">
              Selected: {file.name}
            </p>
          )}

          {/* UPLOAD BUTTON */}
          <button
            onClick={handleUpload}
            disabled={loading}
            className="
              btn btn-primary btn-lg w-full
              hover:brightness-110 hover:scale-[1.02]
              transition-all duration-200
              disabled:opacity-50
            "
          >
            {loading ? "Analyzing Resume..." : "🚀 Analyze Resume"}
          </button>

          {/* PREVIEW RESULT */}
          {/* {preview && (
           <div className="mt-6 bg-base-200 p-4 rounded-lg text-sm leading-relaxed max-h-64 overflow-y-auto">
             <h3 className="font-semibold mb-2">📌 Resume Text Preview:</h3>
            <pre className="whitespace-pre-wrap">{preview}</pre>
            </div>
          )} */}
          {/* AI FEEDBACK RESULT */}
{feedback && (
  <div className="mt-8 space-y-6">

    {/* SCORE */}
    <div className="text-center">
      <h3 className="text-2xl font-bold">🎯 Resume Score</h3>
      <p className="text-5xl font-extrabold text-primary mt-2">
        {feedback.score}/100
      </p>
      <p className="mt-2 text-base-content/70">{feedback.summary}</p>
    </div>

    {/* STRENGTHS */}
    <div>
      <h4 className="text-lg font-semibold mb-2">✅ Strengths</h4>
      <ul className="list-disc ml-6 space-y-1">
        {feedback.strengths.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>

    {/* IMPROVEMENTS */}
    <div>
      <h4 className="text-lg font-semibold mb-2 text-warning">⚠️ Improvements</h4>
      <ul className="list-disc ml-6 space-y-1">
        {feedback.improvements.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>

    {/* MISSING SKILLS */}
    <div>
      <h4 className="text-lg font-semibold mb-2 text-error">❌ Missing Skills</h4>
      <div className="flex flex-wrap gap-2">
        {feedback.missingSkills.map((skill, i) => (
          <span key={i} className="badge badge-outline badge-error">
            {skill}
          </span>
        ))}
      </div>
    </div>

    {/* ATS TIPS */}
    <div>
      <h4 className="text-lg font-semibold mb-2">🤖 ATS Optimization Tips</h4>
      <ul className="list-disc ml-6 space-y-1">
        {feedback.atsTips.map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ul>
    </div>

  </div>
)}


        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
