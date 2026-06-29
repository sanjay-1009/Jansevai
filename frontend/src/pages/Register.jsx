import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import {registerUser} from "../services/cognitoService";

function Register() {

  const navigate = useNavigate();

  const [showOtpBox, setShowOtpBox] = useState(false);
  const [otp, setOtp] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    await registerUser(
      formData.name,
      formData.email,
      formData.password
    );

    alert(
      "OTP sent to your email"
    );

    navigate(
      "/verify-otp",
      {
        state: {
          email: formData.email
        }
      }
    );

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

          <i className="bi bi-person-plus-fill auth-logo"></i>

          <h1 className="register-title">
            Citizen Registration
          </h1>

          <p className="register-subtitle">
            Join JanSevai to report, track and resolve civic issues seamlessly.
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="row g-3">

            <div className="col-md-6">

              <input
                type="text"
                className="modern-input"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value
                  })
                }
              />

            </div>

            <div className="col-md-6">

              <input
                type="tel"
                className="modern-input"
                placeholder="Mobile Number"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value
                  })
                }
              />

            </div>

            <div className="col-md-8">

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
            Create Account
          </button>

        </form>

        <div className="text-center mt-4">

          <p>

            Already have an account?

            <Link
              to="/user-login"
              className="text-primary fw-bold ms-2 text-decoration-none"
            >
              Login
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

export default Register;