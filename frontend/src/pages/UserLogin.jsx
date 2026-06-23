import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function UserLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login logic
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", "citizen");
    navigate("/complaint");
  };

  return (
    <div className="auth-container">
      <div className="glass-panel auth-card p-5">
        <div className="text-center mb-4">
          <i className="bi bi-person-circle auth-logo text-primary"></i>
          <h2 className="font-weight-bold">Citizen Login</h2>
          <p className="text-muted">Welcome back to JanSevai</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="modern-input"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input
            type="password"
            className="modern-input"
            placeholder="Password"
            required
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          
          <button type="submit" className="action-btn submit-btn w-100 mt-3">
            Sign In
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-muted">
            Don't have an account? <Link to="/register" className="text-primary fw-bold text-decoration-none">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
