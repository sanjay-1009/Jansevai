import { useEffect, useState } from "react";
import axios from "axios";

import StatsCards from "../components/StatsCards";
import TamilNaduHeatMap from "../components/TamilNaduHeatMap";
import AIInsights from "../components/AIInsights";
import DashboardAnalytics from "../components/DashboardAnalytics";

function AdminDashboard() {

  const [complaints, setComplaints] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [locationSearch, setLocationSearch] = useState("");

  // =========================
  // LOAD FROM BACKEND (DYNAMO DB via Spring Boot)
  // =========================
  const loadComplaints = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/complaints"
      );

      setComplaints(response.data);
    } catch (error) {
      console.log("Error loading complaints:", error);
    }
  };

  // =========================
  // UPDATE STATUS (FIXED FOR DYNAMO DB FLOW)
  // =========================
  const updateStatus = async (id, status) => {

  try {

    await axios.put(
      `http://localhost:8080/api/complaints/${id}/${encodeURIComponent(status)}`
    );

    loadComplaints();

  } catch (error) {

    console.log(error);

    alert("Status Update Failed");

  }

};

  // =========================
  // DELETE COMPLAINT
  // =========================
  const deleteComplaint = async (id) => {
    if (!window.confirm("Delete Complaint?")) return;

    try {
      await axios.delete(
        `http://localhost:8080/api/complaints/${id}`
      );

      loadComplaints();
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================
  useEffect(() => {
    loadComplaints();
  }, []);

  // =========================
  // FILTERING (UNCHANGED UI LOGIC)
  // =========================
  const filteredComplaints = complaints.filter((c) => {

    const categoryMatch =
      selectedCategory === "All" ||
      c.category === selectedCategory;

    const departmentMatch =
      selectedDepartment === "All" ||
      c.department === selectedDepartment;

    const locationMatch =
      locationSearch === "" ||
      (c.locationName &&
        c.locationName
          .toLowerCase()
          .includes(locationSearch.toLowerCase()));

    return categoryMatch && departmentMatch && locationMatch;
  });

  return (
    <div className="container mt-5">

      {/* ================= HEADER ================= */}
      <div className="mb-4">
        <h2>Smart Governance Dashboard</h2>
        <p className="text-muted">
          AI Powered Public Complaint Monitoring System
        </p>
      </div>

      {/* ================= STATS ================= */}
      <StatsCards complaints={complaints} />

      {/* ================= AI INSIGHTS ================= */}
      <AIInsights complaints={filteredComplaints} />

      {/* ================= MAP + ANALYTICS ================= */}
      <div className="card shadow mb-4">
        <div className="card-body">

          <h4>Tamil Nadu Complaint Heat Map</h4>

          <TamilNaduHeatMap complaints={filteredComplaints} />

          <DashboardAnalytics complaints={filteredComplaints} />

        </div>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="row mb-4">

        <div className="col-md-4">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option>All</option>
            <option>Road</option>
            <option>Water</option>
            <option>Electricity</option>
            <option>Garbage</option>
            <option>Drainage</option>
          </select>
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option>All</option>
            <option>Road Department</option>
            <option>Water Department</option>
            <option>Electricity Department</option>
            <option>Garbage Department</option>
            <option>Drainage Department</option>
          </select>
        </div>

        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search Location..."
            value={locationSearch}
            onChange={(e) => setLocationSearch(e.target.value)}
          />
        </div>

      </div>

      {/* ================= TABLE ================= */}
      <table className="table table-bordered">

        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Department</th>
            <th>Priority</th>
            <th>Location</th>
            <th>Verified</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {filteredComplaints.map((c) => (
            <tr key={c.complaintId}>

              <td>{c.complaintId}</td>

              <td>{c.title}</td>

              <td>
                <span className="badge bg-info">
                  {c.category}
                </span>
              </td>

              <td>{c.department}</td>

              <td>
                {c.priority === "High" ? (
                  <span className="badge bg-danger">
                    High
                  </span>
                ) : (
                  <span className="badge bg-warning text-dark">
                    {c.priority}
                  </span>
                )}
              </td>

              <td>
                {c.locationName ? c.locationName : "Unknown"}
              </td>

              <td>
  {String(c.locationVerified) === "true" ? (
    <span className="badge bg-success">
      Verified
    </span>
  ) : (
    <span className="badge bg-secondary">
      Not Verified
    </span>
  )}
</td>

              <td>
                {c.createdAt
                  ? new Date(c.createdAt).toLocaleString()
                  : "-"}
              </td>

              <td>{c.status}</td>

              <td>
                <div className="d-flex gap-2 justify-content-center">

                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() =>
                      updateStatus(c.complaintId, "In Progress")
                    }
                  >
                    Start
                  </button>

                  <button
                    className="btn btn-success btn-sm"
                    onClick={() =>
                      updateStatus(c.complaintId, "Resolved")
                    }
                  >
                    Resolve
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      deleteComplaint(c.complaintId)
                    }
                  >
                    Delete
                  </button>

                </div>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default AdminDashboard;