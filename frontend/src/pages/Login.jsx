import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import api from "../services/api";
import { loginSuccess } from "../store/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await api.post("/auth/signin", { email, password });
      dispatch(loginSuccess(res.data));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Login</h2>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <input
              className="input input-bordered w-full mb-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="input input-bordered w-full mb-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn btn-primary w-full">Login</button>
          </form>

          <p className="text-sm mt-2">
            New user? <Link to="/signup" className="link">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
