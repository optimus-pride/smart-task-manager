import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );

  const [showRegister, setShowRegister] = useState(false);

  const handleLoginSuccess = () => {
    setUserName(localStorage.getItem("userName") || "");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setUserName("");
    setIsAuthenticated(false);
  };

  return (
    <>
      {!isAuthenticated && (
        showRegister ? (
          <Register
            onRegisterSuccess={() => setShowRegister(false)}
            onSwitchToLogin={() => setShowRegister(false)}
          />
        ) : (
          <Login
            onLoginSuccess={handleLoginSuccess}
            onSwitchToRegister={() => setShowRegister(true)}
          />
        )
      )}

      {isAuthenticated && (
        <Dashboard
          userName={userName}
          onLogout={handleLogout}
          onAuthError={handleLogout}
        />
      )}
    </>
  );
}

export default App;