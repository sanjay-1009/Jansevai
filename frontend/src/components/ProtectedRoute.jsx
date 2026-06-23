import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  // Simple mock authentication using localStorage
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const userRole = localStorage.getItem("userRole");

  if (!isAuthenticated) {
    return <Navigate to={role === "admin" ? "/admin-login" : "/user-login"} />;
  }

  if (role && userRole !== role) {
    // If the required role doesn't match the current user's role
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
