import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { loginUser } from "../services/cognitoService";

function UserLogin() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    await loginUser(
      formData.email,
      formData.password
    );

    navigate("/register-complaint");

  } catch (error) {

    alert(error.message);

  }

};

  return (

    <div className="auth-page">

      <div className="register-bento">

        <Link
          to="/"
          className="back-link"
        >
          ← Return to Home
        </Link>

        <div className="text-center mb-5">

          <i
            className="bi bi-person-circle auth-logo"
          ></i>

          <h1 className="register-title">
            Citizen Login
          </h1>

          <p className="register-subtitle">
            Access your JanSevai account and track your complaints.
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="row g-3">

            <div className="col-12">

              <input
                type="email"
                className="modern-input"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value
                  })
                }
              />

            </div>

            <div className="col-12">

              <input
                type="password"
                className="modern-input"
                placeholder="Password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value
                  })
                }
              />

            </div>

          </div>

          <button
            type="submit"
            className="register-btn mt-4"
          >
            Login
          </button>

        </form>

        <div className="text-center mt-4">

          <p>

            New User?

            <Link
              to="/register"
              className="text-primary fw-bold ms-2 text-decoration-none"
            >
              Create Account
            </Link>

          </p>

          <p>

            Official Access?

            <Link
              to="/admin-login"
              className="text-warning fw-bold ms-2 text-decoration-none"
            >
              Admin Login
            </Link>

          </p>

        </div>

      </div>

    </div>

  );
}

export default UserLogin;