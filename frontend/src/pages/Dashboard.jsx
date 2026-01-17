import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { toggleTheme } from "../store/themeSlice";

const roles = [
  { id: "frontend", label: "Frontend Developer" },
  { id: "backend", label: "Backend Developer" },
  { id: "mern", label: "MERN Stack Developer" },
  { id: "ml", label: "Machine Learning (Fresher)" }
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startInterview = (role) => {
    navigate("/interview", { state: { role } });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-base-100 shadow-lg p-5 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6">AI Interview Coach</h2>

          <button
            className="btn btn-outline w-full mb-3"
            onClick={() => dispatch(toggleTheme())}
          >
            Toggle Theme
          </button>
        </div>

        <button
          className="btn btn-error btn-outline"
          onClick={() => dispatch(logout())}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-auto">
        <h1 className="text-2xl font-semibold mb-6">
          Choose Interview Role
        </h1>

        <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
          {roles.map((role) => (
            <div
              key={role.id}
              className="card bg-base-100 shadow-md hover:shadow-xl transition"
            >
              <div className="card-body">
                <h2 className="card-title">{role.label}</h2>
                <p>
                  Practice real interview questions and get AI feedback.
                </p>
                <button
                  className="btn btn-primary mt-4"
                  onClick={() => startInterview(role.id)}
                >
                  Start Interview
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
