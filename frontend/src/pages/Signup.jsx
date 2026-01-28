import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import API from "../utils/axiosInstance";

import { useSelector } from "react-redux";




const Signup = () => {
  const navigate = useNavigate();
  
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ---------- Password strength ---------- */
  const getStrength = () => {
        if (password.length ==0) return "";
    if (password.length < 4) return "Weak";
    if (password.length < 8) return "Medium";
    return "Strong";
  };

  const strengthColor = {
    Weak: "bg-error",
    Medium: "bg-warning",
    Strong: "bg-success"
  }[getStrength()];

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

const res = await API.post("/auth/signup", {
  name,
  email,
  password,
});
      toast.success("Account created! Please login.");
      navigate("/login");
} catch (err) {
  toast.error(err.response?.data?.message || err.message);
}
 finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (isAuth) {
    navigate("/dashboard");
  }
}, [isAuth]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 px-4">
      <div className="relative w-full max-w-6xl bg-base-100 rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden">

        {/* LEFT PANEL – ONBOARDING MESSAGE */}
        <div className="hidden md:flex flex-col justify-center px-14 bg-secondary/10">
          <h1 className="text-5xl font-bold mb-4">
            Start Your Journey 🚀
          </h1>

          <p className="text-xl text-secondary font-medium">
            Build confidence before real interviews
          </p>

          <p className="mt-6 text-base-content/70 max-w-md">
            Create an account to practice curated interview questions,
            receive instant AI feedback, and steadily improve your answers.
          </p>

          {/* Floating Illustration */}
          <div className="relative mt-10 w-80 float-slow group">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/career-growth-illustration-download-in-svg-png-gif-file-formats--star-trophy-target-business-pack-illustrations-7394756.png"
              alt="Career growth illustration"
              className="
                relative z-10
                rounded-xl
                transition-all
                duration-300
                group-hover:scale-[1.04]
                group-hover:-translate-y-1
                group-hover:shadow-2xl
                cursor-pointer
              "
            />
          </div>
        </div>

        {/* RIGHT PANEL – SIGNUP FORM */}
        <div className="flex items-center justify-center p-10 sm:p-14">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-1">
                Create Account ✨
              </h2>
              <p className="text-base-content/70">
                Join thousands preparing smarter
              </p>
            </div>

            <form onSubmit={handleSignup} className="space-y-6">
              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Full Name
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered input-lg w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  className="input input-bordered input-lg w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label flex justify-between">
                  <span className="label-text font-medium">
                    Password
                  </span>
                  <button
                    type="button"
                    className="text-sm text-secondary"
                    onClick={() => setShowPassword((p) => !p)}
                  >
                    {showPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered input-lg w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {/* Strength Meter */}
                <div className="mt-2">
                  <div className="h-1 w-full bg-base-300 rounded">
                    <div
                      className={`h-1 rounded ${strengthColor}`}
                      style={{
                        width:
                          getStrength() === "Weak"
                            ? "33%"
                            : getStrength() === "Medium"
                            ? "66%"
                            : "100%"
                      }}
                    />
                  </div>
                  <p className="text-xs mt-1 text-base-content/60">
                    Strength: {getStrength()}
                  </p>
                </div>
              </div>

              {/* Signup Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-secondary btn-lg w-full text-lg"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <div className="pt-4 border-t text-center">
              <p className="text-sm text-base-content/70">
                Already have an account?
              </p>
              <Link
                to="/login"
                className="btn btn-outline btn-secondary w-full"
              >
                Login instead
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;
