import { Link } from "react-router-dom";
import "./Home.css";
function Home() {
  return (
    
   <div className="container">

  <div className="hero-bento">

    <span className="hero-badge">
      AI Powered Governance
    </span>

    <h1 className="hero-title">
      Smart Governance
      <br />
      Powered by AI
    </h1>

    <p className="hero-subtitle">
      Report, track and resolve civic issues
      through a smart AI-powered grievance
      redressal platform.
    </p>

  </div>

  <div className="portal-grid">

    <div className="portal-card citizen-card">

      <i
        className="bi bi-people-fill"
        style={{ fontSize: "4rem" }}
      ></i>

      <h2>Citizen Portal</h2>

      <p>
        Register complaints and track
        progress in real time.
      </p>

      <Link
        to="/register"
        className="btn home-btn-primary"
      >
        Register as User
      </Link>
      <br></br> <br></br>

      <Link
        to="/user-login"
        className="btn btn-outline-primary w-100"
      >
        Login
      </Link>

    </div>

    <div className="portal-card admin-card">

      <i
        className="bi bi-shield-lock-fill"
        style={{ fontSize: "4rem" }}
      ></i>

      <h2>Admin Portal</h2>

      <p>
        Manage complaints and monitor
        issue resolution.
      </p>

      <Link
        to="/admin-login"
        className="btn btn-warning w-100"
      >
        Admin Login
      </Link>

    </div>

  </div>

</div>
    
  );
}

export default Home;
