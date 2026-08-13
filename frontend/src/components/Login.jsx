import { useState } from "react";
import { loginUser } from "../services/authService";

function Login({ onLoginSuccess, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
        setError("Email is required");
        return;
    }

    if (!password.trim()) {
        setError("Password is required");
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError("Please enter a valid email address");
        return;
    }

    setLoading(true);

    try {
        const data = await loginUser(email, password);

        console.log("Login successful:", data);

        onLoginSuccess();
    } catch (error) {
        console.error("Login failed:", error);
        setError(error.message);
    } finally{
        setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Smart Task Manager</h1>
          <p>Sign in to manage your tasks.</p>
        </div>

        <div className="login-card">
          <h2>Login</h2>

          {error && <p className="form-error">{error}</p>}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="primary-button login-button"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="auth-switch">
            Don't have an account?{" "}
            <button
              type="button"
              className="auth-switch-button"
              onClick={onSwitchToRegister}
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;