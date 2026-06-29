import {BrowserRouter,Routes,Route} from "react-router-dom";
import VerifyOTP from "./pages/VerifyOTP";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ComplaintForm from "./pages/ComplaintForm";
import AdminDashboard from "./pages/AdminDashboard";
import TrackComplaint from "./pages/TrackComplaint";
import AdminLogin from "./pages/AdminLogin";
import UserLogin from "./pages/UserLogin";
import Register from "./pages/Register";


import ProtectedRoute from "./components/ProtectedRoute";



function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/complaint"
          element={<ComplaintForm />}
        />

        <Route
          path="/track"
          element={<TrackComplaint />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/user-login"
          element={<UserLogin />}
        />

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
  path="/register-complaint"
  element={<ComplaintForm />}
/>

          <Route
  path="/verify-otp"
  element={<VerifyOTP />}
/>

      </Routes>

    </BrowserRouter>

  );
}

export default App;