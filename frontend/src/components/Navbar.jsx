import { Link } from "react-router-dom";

function Navbar() {

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

      <div className="container">

        <Link
          className="navbar-brand"
          to="/"
        >
          JanSevai AI
        </Link>

        <div>

          <Link
            className="btn btn-light me-2"
            to="/"
          >
            Register Complaint
          </Link>

          <Link
            className="btn btn-light me-2"
            to="/track"
          >
            Track Complaint
          </Link>

          <Link
            className="btn btn-warning"
            to="/admin"
          >
            Admin Dashboard
          </Link>

        </div>

      </div>

    </nav>

  );
}

export default Navbar;