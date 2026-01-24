import { useState } from "react";
import api from "../utils/axiosInstance";
import toast from "react-hot-toast";

const ResumeAnalyzer = () => {
  
  const [role, setRole] = useState("Frontend Developer");
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

    // ANY FIELD NAME WILL WORK (backend uses upload.any())
    formData.append("resume", file);   // name doesn't matter now
    formData.append("role", role);
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
{/* JOB ROLE SELECTOR */}
<div className="space-y-2">
  <label className="font-semibold text-sm">🎯 Target Job Role</label>
  <select
    value={role}
    onChange={(e) => setRole(e.target.value)}
    className="select select-bordered w-full"
  >
    <option>Frontend Developer</option>
    <option>Backend Developer</option>
    <option>Full Stack Developer</option>
    <option>MERN Stack Developer</option>
    <option>Java Developer</option>
    <option>Python Developer</option>
    <option>Data Analyst</option>
    <option>Machine Learning Engineer</option>
    <option>DevOps Engineer</option>
    <option>Software Engineer (Fresher)</option>
  </select>
</div>

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
  <div className="mt-10 space-y-10">
    <p className="text-center text-sm text-base-content/60 mb-2">
    🎯 Analyzed for role: <span className="font-semibold">{role}</span>
  </p>
    {/* OVERALL SCORE */}
    <div className="text-center bg-base-200 rounded-2xl p-6 shadow">
      <h3 className="text-3xl font-extrabold mb-2">🎯 Resume Score</h3>
      <p className="text-6xl font-extrabold text-primary">
        {feedback.score}/100
      </p>
      <p className="mt-4 text-lg text-base-content/70 max-w-2xl mx-auto">
        {feedback.summary}
      </p>
    </div>
  
    {/* GRID SECTIONS */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

      {/* STRENGTHS */}
      <div className="bg-base-100 rounded-xl shadow-lg p-6">
        <h4 className="text-2xl font-bold mb-4 text-success">
          ✅ Strengths
        </h4>
        <ul className="space-y-2 text-base leading-relaxed">
          {feedback.strengths.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span>•</span>
              <span className="text-base-content/80">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* IMPROVEMENTS */}
      <div className="bg-base-100 rounded-xl shadow-lg p-6">
        <h4 className="text-2xl font-bold mb-4 text-warning">
          ⚠️ Improvements
        </h4>
        <ul className="space-y-2 text-base leading-relaxed">
          {feedback.improvements.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span>•</span>
              <span className="text-base-content/80">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* MISSING SKILLS */}
      <div className="bg-base-100 rounded-xl shadow-lg p-6">
        <h4 className="text-2xl font-bold mb-4 text-error">
          ❌ Missing Skills
        </h4>
        <div className="flex flex-wrap gap-3">
          {feedback.missingSkills.map((skill, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full border border-error text-error text-sm font-semibold"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* ATS OPTIMIZATION */}
      <div className="bg-base-100 rounded-xl shadow-lg p-6">
        <h4 className="text-2xl font-bold mb-4 text-info">
          🤖 ATS Optimization Tips
        </h4>
        <ul className="space-y-2 text-base leading-relaxed">
          {feedback.atsTips.map((tip, i) => (
            <li key={i} className="flex gap-2">
              <span>•</span>
              <span className="text-base-content/80">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  </div>
)}
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
