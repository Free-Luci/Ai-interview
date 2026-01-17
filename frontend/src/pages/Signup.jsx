import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await api.post("/auth/signup", { name, email, password });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Signup</h2>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <input
              className="input input-bordered w-full mb-3"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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

            <button className="btn btn-primary w-full">Signup</button>
          </form>

          <p className="text-sm mt-2">
            Already have account? <Link to="/login" className="link">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
