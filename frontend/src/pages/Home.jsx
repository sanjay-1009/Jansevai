import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container-fluid p-0">
      <div className="hero-section">
        <div className="container">
          <h1 className="hero-title">
            Smart Governance <br/> Powered by AI
          </h1>
          <p className="hero-subtitle">
            Experience the future of civic engagement. Report, track, and resolve community issues with unparalleled speed and transparency through the JanSevai platform.
          </p>
          
          <div className="row justify-content-center g-4 mt-4">
            <div className="col-md-5 col-lg-4">
              <div className="glass-panel p-5 h-100 text-center text-decoration-none d-block">
                <i className="bi bi-people-fill text-primary" style={{fontSize: "3rem"}}></i>
                <h3 className="mt-3 font-weight-bold">Citizen Portal</h3>
                <p className="text-muted mb-4">Register new complaints or track existing ones with ease.</p>
                <Link to="/register" className="btn btn-primary w-100 rounded-pill py-2 fw-bold mb-2 shadow-sm">
                  Get Started
                </Link>
                <Link to="/user-login" className="btn btn-outline-primary w-100 rounded-pill py-2 fw-bold">
                  Login
                </Link>
              </div>
            </div>

            <div className="col-md-5 col-lg-4">
              <div className="glass-panel p-5 h-100 text-center text-decoration-none d-block">
                <i className="bi bi-shield-lock-fill text-warning" style={{fontSize: "3rem"}}></i>
                <h3 className="mt-3 font-weight-bold">Admin Portal</h3>
                <p className="text-muted mb-4">Command center for officials to manage and resolve issues.</p>
                <Link to="/admin-login" className="btn btn-warning text-dark w-100 rounded-pill py-2 fw-bold shadow-sm">
                  Admin Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
