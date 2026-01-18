// import { Routes, Route, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// import AppLayout from "./components/layout/AppLayout";
// import { Toaster } from "react-hot-toast";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
// import Interview from "./pages/Interview";
// import Landing from "./pages/Landing";

// /* ------------------ PROTECTED ROUTE ------------------ */
// const ProtectedRoute = ({ children }) => {
//   const isAuth = useSelector(
//     (state) => state.auth.isAuthenticated
//   );

//   return isAuth ? children : <Navigate to="/login" replace />;
// };

// /* ------------------ APP LAYOUT SHELL ------------------ */
// const LayoutShell = ({ children }) => {
//   return (
//     <div className="min-h-screen bg-base-200">
//       {/* Page container */}
//       <main className="min-h-screen transition-colors duration-200">
//         {children}
//       </main>
//     </div>
//   );
// };

// /* ------------------ APP ------------------ */
// function App() {
//   const theme = useSelector((state) => state.theme.theme);

//   return (
//     <div data-theme={theme}>
//         {/* Toast Provider */}
//       <Toaster
//         position="top-right"
//         toastOptions={{
//           duration: 3000,
//           style: {
//             background: "hsl(var(--b1))",
//             color: "hsl(var(--bc))"
//           }
//         }}
//       />
//       <LayoutShell>
//     <Routes>
//   {/* public routes */}
//   <Route path="/" element={<Landing />} />
// <Route path="/login" element={<Login />} />
// <Route path="/signup" element={<Signup />} />

//           {/* Protected Routes */}
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/interview"
//             element={
//               <ProtectedRoute>
//                 <Interview />
//               </ProtectedRoute>
//             }
//           />

//           {/* Fallback */}
//           <Route
//             path="*"
//             element={<Navigate to="/dashboard" replace />}
//           />
//         </Routes>
//       </LayoutShell>
//     </div>
//   );
// }

// export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import AppLayout from "./components/layout/AppLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Interview from "./pages/Interview.jsx";
import InterviewSummary from "./pages/InterviewSummary";

const ProtectedRoute = ({ children }) => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return isAuth ? children : <Navigate to="/login" />;
};

function App() {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div data-theme={theme} className="min-h-screen">
      <Routes>
        {/* Public pages */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Landing />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected pages */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/interview" element={<Interview />} />
          <Route
 path="/interview/summary"  element={
    <ProtectedRoute>
      <InterviewSummary />
    </ProtectedRoute>
  }
/>

        </Route>
      </Routes>
    </div>
  );
}

export default App;

