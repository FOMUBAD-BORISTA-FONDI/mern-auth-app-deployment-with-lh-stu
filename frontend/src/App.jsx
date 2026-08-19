import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useAuth } from "./context/AuthContext.jsx";

const Topbar = () => (
  <div className="topbar">
    <div className="brand">
      <span className="brand-dot" />
      MERN Auth Demo
    </div>
    <div className="brand-sub">Localhost Academy</div>
  </div>
);

function App() {
  const { user } = useAuth();

  return (
    <div className="page">
      <Topbar />
      <Routes>
        <Route
          path="/login"
          element={
            user ? <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} replace /> : <Login />
          }
        />
        <Route
          path="/register"
          element={
            user ? <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} replace /> : <Register />
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
