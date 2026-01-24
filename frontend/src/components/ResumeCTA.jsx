import { Link } from "react-router-dom";
import useRotatingMessage from "../hooks/useRotatingMessage";

const messages = [
  "📄 Upload your resume and get AI feedback",
  "🚀 Improve your resume before interviews",
  "🔥 Increase shortlist chances with AI",
  "💡 Find weaknesses in your resume instantly",
];

const ResumeCTA = () => {
  const message = useRotatingMessage(messages, 3000);

  return (
    <div className="w-full my-12">
      <div className="
        max-w-5xl mx-auto
        bg-gradient-to-r from-primary/10 to-secondary/10
        border border-primary/20
        rounded-2xl
        p-6 sm:p-8
        flex flex-col md:flex-row
        items-center justify-between
        gap-6
        shadow-lg
      ">

        {/* Rotating Message */}
        <div className="text-center md:text-left">
          <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2">
            AI Resume Analyzer
          </h3>

          <p className="
            text-base sm:text-lg
            text-base-content/80
            min-h-[2.5rem]
            transition-all duration-500
          ">
            {message}
            <span className="animate-pulse ml-1">|</span>
          </p>
        </div>

        {/* Button */}
        <Link
          to="/resume-analyzer"
          className="
            w-full md:w-auto
            btn btn-primary btn-lg
            px-10 py-4
            text-lg font-semibold
            rounded-xl
            hover:scale-[1.05]
            hover:brightness-110
            active:scale-95
            focus:ring-4 focus:ring-primary/40
            shadow-lg hover:shadow-xl
            transition-all duration-200
            flex items-center justify-center gap-2
          "
        >
          📄 Analyze My Resume
        </Link>
      </div>
    </div>
  );
};

export default ResumeCTA;
