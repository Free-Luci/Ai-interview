import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { toggleTheme } from "../store/themeSlice";
import toast from "react-hot-toast";
import {
  LayoutDashboard,
  Sun,
  Moon,
  LogOut,
  Code,
  Server,
  Layers,
  Brain
} from "lucide-react";

const roles = [
  {
    id: "frontend",
    label: "Frontend Developer",
    icon: <Code className="w-6 h-6" />
  },
  {
    id: "backend",
    label: "Backend Developer",
    icon: <Server className="w-6 h-6" />
  },
  {
    id: "mern",
    label: "MERN Stack Developer",
    icon: <Layers className="w-6 h-6" />
  },
  {
    id: "ml",
    label: "Machine Learning (Fresher)",
    icon: <Brain className="w-6 h-6" />
  }
];

const handleLogout = () => {
  dispatch(logout());
  toast.success("Logged out successfully");
};

const handleThemeToggle = () => {
  dispatch(toggleTheme());
  toast("Theme updated 🌗");
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startInterview = (role) => {
    navigate("/interview", { state: { role } });
  };

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* MAIN CONTENT */}
      <div className="drawer-content flex flex-col bg-base-200">
        {/* Top Navbar */}
        <div className="navbar bg-base-100 shadow-sm px-6">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost"
            >
              ☰
            </label>
          </div>

          <div className="flex-1 flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-semibold text-lg">
              AI Interview Coach
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => dispatch(toggleTheme())}
            >
              <Sun className="w-4 h-4 hidden dark:block" />
              <Moon className="w-4 h-4 dark:hidden" />
            </button>
          </div>
        </div>

        {/* Page Content */}
<div className="max-w-7xl mx-auto px-6 py-14">
  <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
    Choose Interview Role
  </h1>

  <p className="text-lg md:text-xl text-base-content/70 mb-12 max-w-3xl">
    Practice real interview questions and receive instant AI feedback
    tailored for freshers and early-career developers.
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
    {roles.map((role) => (
      <div
        key={role.id}
        className="card bg-base-100 shadow-xl p-10
                   hover:-translate-y-2 hover:shadow-2xl
                   transition-all duration-300"
      >
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          {role.label}
        </h2>

        <p className="text-lg text-base-content/70 leading-relaxed">
          Simulate a real interview and improve answer clarity
          with structured AI feedback.
        </p>

        <button
          className="btn btn-primary btn-lg mt-8 w-full"
          onClick={() => startInterview(role.id)}
        >
          Start Interview
        </button>
      </div>
    ))}
  </div>
</div>

      {/* SIDEBAR */}
      <div className="drawer-side">
        <label
          htmlFor="dashboard-drawer"
          className="drawer-overlay"
        ></label>

        <aside className="w-64 bg-base-100 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-8">
              AI Interview Coach
            </h2>

<button
  className="btn btn-outline btn-sm w-full mb-3"
  onClick={handleThemeToggle}
>
  Toggle Theme
</button>

          </div>

<button
  className="btn btn-error btn-outline btn-sm flex items-center gap-2"
  onClick={handleLogout}
>
  Logout
</button>

        </aside>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
