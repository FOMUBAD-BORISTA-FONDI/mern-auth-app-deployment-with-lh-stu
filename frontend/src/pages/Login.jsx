import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const user = await login(email, password);
      navigate(user.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to log in. Please try again.");
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
          <span className="terminal-address">127.0.0.1:5173/login</span>
        </div>
        <div className="terminal-body">
          <h1>Sign in</h1>
          <p className="subtitle">Access your Localhost Academy dashboard.</p>

          {error && <div className="alert">⚠ {error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@localhost.academy"
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <button className="btn-primary" type="submit" disabled={submitting}>
              {submitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="form-footer">
            No account yet? <Link to="/register">Create one</Link>
          </div>

          <div className="demo-creds">
            <strong>Demo accounts</strong> (run <code>npm run seed</code> in /backend)<br />
            Admin &rarr; admin@localhost.academy / Admin@123<br />
            User &rarr; user@localhost.academy / User@123
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
