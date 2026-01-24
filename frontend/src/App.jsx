import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "./store/authActions";

import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Interview from "./pages/Interview.jsx";
import InterviewSummary from "./pages/InterviewSummary";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  if (loading) return null; // or spinner
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  if (loading) return null;
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

function App() {
    const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
// --------------CHECK AUTH IF AUTHENTCATED----------
  const loading = useSelector((state) => state.auth.loading);
   useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  // IMPORTANT: WAIT UNTIL AUTH CHECK FINISHES
  if (loading) {
    return null; // or spinner / splash screen
  }
  
  return (
    <div data-theme={theme} className="min-h-screen">
      <Routes>

        {/* PUBLIC pages */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Landing />} /> </Route>
          <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />

        <Route
          path="/login"
          element={
              <Login />
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        {/* PROTECTED ROUTES */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/interview/summary" element={<InterviewSummary />} />
{/* <Route
  path="/resume"
  element={
    <ProtectedRoute>
      <ResumeAnalyzer />
    </ProtectedRoute>
  }
/> */}
        </Route>

      </Routes>
    </div>
  );
}

export default App;
