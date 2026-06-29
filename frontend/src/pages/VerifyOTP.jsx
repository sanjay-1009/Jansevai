import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { verifyUser } from "../services/cognitoService";
import "./Register.css";

function VerifyOTP() {

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");

  const handleVerify = async (e) => {

    e.preventDefault();

    try {

      await verifyUser(
        email,
        otp
      );

      alert(
        "Email verified successfully"
      );

      navigate("/user-login");

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
            className="bi bi-shield-check auth-logo"
          ></i>

          <h1 className="register-title">
            Verify Email
          </h1>

          <p className="register-subtitle">
            Enter the verification code sent to
            <br />
            <strong>{email}</strong>
          </p>

        </div>

        <form onSubmit={handleVerify}>

          <input
            type="text"
            className="modern-input"
            placeholder="Enter OTP"
            required
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value)
            }
          />

          <button
            type="submit"
            className="register-btn mt-4"
          >
            Verify Account
          </button>

        </form>

      </div>

    </div>

  );
}

export default VerifyOTP;