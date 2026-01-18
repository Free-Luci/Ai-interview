import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { loginSuccess } from "../store/authSlice";

import AuthLayout from "../components/Auth/AuthLayout";
import FloatingImage from "../components/Auth/FloatingImage";
import PasswordInput from "../components/Auth/PasswordInput";

import useTypingEffect from "../hooks/useTypingEffect";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const messages = [
  "Practice interviews with AI",
  "Get instant feedback",
  "Improve answers confidently",
  "Crack your next interview"
];

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const text = useTypingEffect(messages);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  
  useEffect(() => {
    if (isAuth) {
      navigate("/dashboard");
    }
  }, [isAuth]);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Fill all fields");

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      dispatch(loginSuccess(data));
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      left={
        <div className="hidden md:flex flex-col justify-center px-14 bg-primary/10">
          <h1 className="text-5xl font-bold mb-4">
            AI Interview Coach
          </h1>
          <p className="text-xl text-primary font-medium h-8">
            {text}<span className="animate-pulse">|</span>
          </p>
          <FloatingImage
            src="https://interviewcopilotai.com/wp-content/uploads/2025/05/Interview-1200-x-720-px-1.jpg"
            alt="Interview illustration"
          />
        </div>
      }
    >
      <h2 className="text-4xl font-bold text-center mb-6">
        Welcome Back 👋
      </h2>

      <form onSubmit={handleLogin} className="space-y-6">
        <input
          type="email"
          className="input input-bordered input-lg w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-primary btn-lg w-full"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

  <p className="text-center text-sm text-base-content/70 mb-3">
    New here?
  </p>

  <Link
    to="/signup"
    className="btn btn-outline btn-secondary w-full"
  >
    Create Account
  </Link>
    </AuthLayout>
  );
};

export default Login;
