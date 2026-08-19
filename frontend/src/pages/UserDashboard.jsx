import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [apiMessage, setApiMessage] = useState("");

  useEffect(() => {
    api
      .get("/dashboard/user")
      .then((res) => setApiMessage(res.data.message))
      .catch(() => setApiMessage("Could not reach the protected user API route."));
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dash-wrap">
      <span className="dash-badge user">● role: user</span>
      <h1>User Dashboard</h1>
      <p className="lead">
        Welcome back, <strong>{user?.name}</strong>. This page will be implemented soon — for now
        it confirms that your JWT, role-based route protection, and the Render API are all
        working end to end.
      </p>

      <div className="console-log">
        <div>$ GET /api/dashboard/user</div>
        <div className="line-ok">✓ token verified — role: user</div>
        <div className="line-pending">→ {apiMessage || "loading response from backend..."}</div>
      </div>

      <div className="dash-footer">
        <button className="btn-ghost" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
