import { useState } from "react";
import axios from "axios";

function TrackComplaint() {

  const [complaintId, setComplaintId] =
    useState("");

  const [mobileNumber, setMobileNumber] =
    useState("");

  const [complaints, setComplaints] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const searchComplaint = async () => {

    console.log("Complaint ID:", complaintId);
console.log("Mobile Number:", mobileNumber);

  try {

    setLoading(true);

    if (complaintId && complaintId.trim() !== "") {

      const response = await axios.get(
        `http://localhost:8080/api/complaints/${complaintId}`
      );

      setComplaints([response.data]);

    }

    else if (mobileNumber && mobileNumber.trim() !== "") {

      const response = await axios.get(
        `http://localhost:8080/api/complaints/mobile/${mobileNumber}`
      );

      setComplaints(response.data);

    }

    else {
      alert("Enter Complaint ID or Mobile Number");
    }

  } catch (error) {
    console.log(error);
    alert("Search Failed");
  } finally {
    setLoading(false);
  }
};

  const pending =
    complaints.filter(
      c => c.status === "Pending"
    ).length;

  const progress =
    complaints.filter(
      c => c.status === "In Progress"
    ).length;

  const resolved =
    complaints.filter(
      c => c.status === "Resolved"
    ).length;

  return (

  <div className="container py-4">

    {/* HEADER SECTION */}
    <div className="text-center mb-4">

      <h2 className="fw-bold">
        <i className="bi bi-person-lines-fill me-2"></i>
        Citizen Complaint Tracker
      </h2>

      <p className="text-muted">
        Search and track your complaint status in real time
      </p>

    </div>

    {/* SEARCH BENTO CARD */}
    <div className="row justify-content-center mb-4">

      <div className="col-lg-8">

        <div className="card shadow-lg border-0 rounded-4">

          <div className="card-body p-4">

            <div className="row align-items-center">

              <div className="col-md-5">

                <label className="form-label fw-semibold">
                  Complaint ID
                </label>

                <input
                  className="form-control form-control-lg"
                  placeholder="Enter ID"
                  value={complaintId}
                  onChange={(e) =>
                    setComplaintId(e.target.value)
                  }
                />

              </div>

              <div className="col-md-2 text-center">

                <span className="badge bg-dark px-3 py-2">
                  OR
                </span>

              </div>

              <div className="col-md-5">

                <label className="form-label fw-semibold">
                  Mobile Number
                </label>

                <input
                  className="form-control form-control-lg"
                  placeholder="Enter mobile"
                  value={mobileNumber}
                  onChange={(e) =>
                    setMobileNumber(e.target.value)
                  }
                />

              </div>

            </div>

            <div className="text-center mt-4">

              <button
                className="btn btn-primary px-5 py-2 rounded-pill shadow-sm"
                onClick={searchComplaint}
              >

                <i className="bi bi-search me-2"></i>
                Track Complaint

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

    {/* LOADING */}
    {loading && (
      <div className="text-center mb-3">
        <div className="spinner-border text-primary"></div>
      </div>
    )}

    {/* SUMMARY BENTO CARDS */}
    {complaints.length > 0 && (

      <div className="row g-3 mb-4">

        <div className="col-md-3">
          <div className="card border-0 shadow-sm text-center rounded-4">
            <div className="card-body">
              <h6>Total</h6>
              <h3>{complaints.length}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm text-center rounded-4">
            <div className="card-body">
              <h6>Pending</h6>
              <h3 className="text-danger">{pending}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm text-center rounded-4">
            <div className="card-body">
              <h6>In Progress</h6>
              <h3 className="text-warning">{progress}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm text-center rounded-4">
            <div className="card-body">
              <h6>Resolved</h6>
              <h3 className="text-success">{resolved}</h3>
            </div>
          </div>
        </div>

      </div>

    )}

    {/* COMPLAINT CARDS */}
    <div className="row g-3">

      {complaints.map((c) => (

        <div className="col-12" key={c.id}>

          <div className="card shadow border-0 rounded-4">

            <div className="card-body">

              {/* HEADER */}
              <div className="d-flex justify-content-between align-items-center">

                <h5 className="mb-0 fw-bold">
                  #{c.id} — {c.title}
                </h5>

                <span className={
                  c.status === "Resolved"
                    ? "badge bg-success"
                    : c.status === "In Progress"
                    ? "badge bg-warning text-dark"
                    : "badge bg-danger"
                }>
                  {c.status}
                </span>

              </div>

              <hr />

              {/* DETAILS GRID */}
              <div className="row">

                <div className="col-md-6">
                  <p><strong>Category:</strong> {c.category}</p>
                  <p><strong>Department:</strong> {c.department}</p>
                  <p><strong>Priority:</strong> {c.priority}</p>
                </div>

                <div className="col-md-6">
                  <p><strong>Location:</strong> {c.locationName}</p>
                  <p><strong>District:</strong> {c.district}</p>
                  <p><strong>Status:</strong> {c.status}</p>
                </div>

              </div>

              {/* DESCRIPTION */}
              <div className="mt-2 p-3 bg-light rounded-3">

                <small className="text-muted">
                  Description
                </small>

                <div>
                  {c.description}
                </div>

              </div>

            </div>

          </div>

        </div>

      ))}

    </div>

  </div>

);
}

export default TrackComplaint;