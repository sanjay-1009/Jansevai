import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

import {
  CognitoUser,
  AuthenticationDetails
} from "amazon-cognito-identity-js";

import { jwtDecode } from "jwt-decode";
import { userPool } from "../services/cognito";

function AdminLogin() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const authDetails = new AuthenticationDetails({
      Username: formData.email,
      Password: formData.password
    });

    const user = new CognitoUser({
      Username: formData.email,
      Pool: userPool
    });

    user.authenticateUser(authDetails, {
      onSuccess: (result) => {

        const token = result.getIdToken().getJwtToken();

        localStorage.setItem("jwtToken", token);
        localStorage.setItem("isAuthenticated", "true");

        const decoded = jwtDecode(token);

        const groups = decoded?.["cognito:groups"] || [];

        if (groups.includes("Admins")) {

          localStorage.setItem("userRole", "admin");

          navigate("/admin");

        } else {

          alert("Access Denied: Not an Admin");

          user.signOut();

          localStorage.clear();
        }
      },

      onFailure: (err) => {
        alert(err.message);
      }
    });
  };

  return (
    <div className="auth-page">

      <div className="register-bento">

        <Link to="/" className="back-link">
          ← Return to Home
        </Link>

        <div className="text-center mb-5">

          <i
            className="bi bi-shield-lock-fill"
            style={{ fontSize: "4rem", color: "#f59e0b" }}
          ></i>

          <h1
            className="register-title"
            style={{
              background: "linear-gradient(90deg,#f59e0b,#ef4444)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Admin Login
          </h1>

          <p className="register-subtitle">
            Secure access for government officials and administrators.
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            className="modern-input"
            placeholder="Admin Email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value
              })
            }
          />

          <input
            type="password"
            className="modern-input"
            placeholder="Admin Password"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value
              })
            }
          />

          <button
            type="submit"
            className="btn w-100 mt-4"
            style={{
              height: "58px",
              borderRadius: "18px",
              fontWeight: "700",
              fontSize: "1.1rem",
              background: "linear-gradient(135deg,#f59e0b,#ef4444)",
              color: "white",
              border: "none"
            }}
          >
            Admin Sign In
          </button>

        </form>

        <div className="text-center mt-4">

          <p>
            Citizen Access?
            <Link to="/user-login" className="text-primary fw-bold ms-2 text-decoration-none">
              User Login
            </Link>
          </p>

          <p>
            Need an account?
            <Link to="/register" className="text-success fw-bold ms-2 text-decoration-none">
              Register
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default AdminLogin;