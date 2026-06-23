import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock admin login logic
    if (formData.email === "admin@jansevai.in" && formData.password === "admin123") {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", "admin");
      navigate("/admin-dashboard");
    } else {
      alert("Invalid admin credentials (hint: admin@jansevai.in / admin123)");
    }
  };

  return (
    <div className="auth-container">
      <div className="glass-panel auth-card p-5" style={{borderTop: "5px solid var(--warning-color)"}}>
        <div className="text-center mb-4">
          <i className="bi bi-shield-lock auth-logo text-warning"></i>
          <h2 className="font-weight-bold">Admin Portal</h2>
          <p className="text-muted">Authorized Personnel Only</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="modern-input"
            placeholder="Admin Email"
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
          
          <button type="submit" className="action-btn bg-dark text-warning w-100 mt-3">
            Secure Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
