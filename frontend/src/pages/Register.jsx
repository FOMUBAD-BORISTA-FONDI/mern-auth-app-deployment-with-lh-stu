import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const user = await register(form.name, form.email, form.password, role);
      navigate(user.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to create account. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="terminal-card">
        <div className="terminal-chrome">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
          <span className="terminal-address">127.0.0.1:5173/register</span>
        </div>
        <div className="terminal-body">
          <h1>Create account</h1>
          <p className="subtitle">For classroom testing, pick which role to create.</p>

          {error && <div className="alert">⚠ {error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input id="name" required value={form.name} onChange={update("name")} placeholder="Jane Student" />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={update("email")}
                placeholder="you@localhost.academy"
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={form.password}
                onChange={update("password")}
                placeholder="At least 6 characters"
              />
            </div>
            <div className="field">
              <label>Role</label>
              <div className="role-toggle">
                <button
                  type="button"
                  data-role="user"
                  className={role === "user" ? "active" : ""}
                  onClick={() => setRole("user")}
                >
                  User
                </button>
                <button
                  type="button"
                  data-role="admin"
                  className={role === "admin" ? "active" : ""}
                  onClick={() => setRole("admin")}
                >
                  Admin
                </button>
              </div>
            </div>
            <button className="btn-primary" type="submit" disabled={submitting}>
              {submitting ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="form-footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
