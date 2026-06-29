import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, getRole } from "../services/auth";

function Navbar() {

  const navigate = useNavigate();

  const loggedIn = isLoggedIn();
  const role = getRole(); // "citizen" or "admin"

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container">

        <Link className="navbar-brand" to="/">
          JanSevai AI
        </Link>

        <div>

          {!loggedIn && (
            <>
              <Link to="/user-login" className="btn btn-light me-2">
                Citizen Login
              </Link>

              <Link to="/admin-login" className="btn btn-warning">
                Admin Login
              </Link>
            </>
          )}

          {loggedIn && role === "citizen" && (
            <>
              <Link to="/register-complaint" className="btn btn-light me-2">
                Register Complaint
              </Link>

              <Link to="/track" className="btn btn-outline-light me-2">
                Track Complaint
              </Link>
            </>
          )}

          {loggedIn && role === "admin" && (
            <Link to="/admin" className="btn btn-warning me-2">
              Admin Dashboard
            </Link>
          )}

          {loggedIn && (
            <button onClick={logout} className="btn btn-danger">
              Logout
            </button>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;