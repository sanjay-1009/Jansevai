import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock registration logic
    alert("Registration successful! Please login.");
    navigate("/user-login");
  };

  return (
    <div className="auth-container">
      <div className="glass-panel auth-card p-5">
        <div className="text-center mb-4">
          <i className="bi bi-person-plus-fill auth-logo"></i>
          <h2 className="font-weight-bold">Citizen Registration</h2>
          <p className="text-muted">Join JanSevai to report and track issues</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="modern-input"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input
            type="email"
            className="modern-input"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input
            type="tel"
            className="modern-input"
            placeholder="Mobile Number"
            required
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
          <input
            type="password"
            className="modern-input"
            placeholder="Password"
            required
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          
          <button type="submit" className="action-btn location-btn w-100 mt-3">
            Register Now
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-muted">
            Already have an account? <Link to="/user-login" className="text-primary fw-bold text-decoration-none">Login here</Link>
          </p>
          <p className="text-muted small mt-2">
            Are you an official? <Link to="/admin-login" className="text-warning fw-bold text-decoration-none">Admin Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
