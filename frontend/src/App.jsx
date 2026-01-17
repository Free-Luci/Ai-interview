import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Interview from "./pages/Interview";

const ProtectedRoute = ({ children }) => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return isAuth ? children : <Navigate to="/login" />;
};

function App() {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div data-theme={theme} className="min-h-screen bg-base-200">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/interview"
          element={
            <ProtectedRoute>
              <Interview />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </div>
  );
}

export default App;
