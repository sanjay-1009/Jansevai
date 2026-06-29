import { useState } from "react";
import axios from "axios";

function TrackComplaint() {

  const [complaintId, setComplaintId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchComplaint = async () => {

    console.log("Complaint ID =", JSON.stringify(complaintId));
    console.log("Mobile Number =", mobileNumber);

    try {

      setLoading(true);

      if (complaintId.trim() !== "") {

        const id = complaintId.replace("#", "").trim();

        console.log("Searching ID:", id);

        const response = await axios.get(
          `http://localhost:8080/api/complaints/${id}`
        );

        setComplaints([response.data]);

      }

      else if (mobileNumber.trim() !== "") {

        const response = await axios.get(
          `http://localhost:8080/api/complaints/mobile/${mobileNumber}`
        );

        setComplaints(response.data);

      }

      else {

        alert("Enter Complaint ID or Mobile Number");

      }

    }
    catch (error) {

      console.log(error);

      alert("Search Failed");

    }
    finally {

      setLoading(false);

    }

  };

  const pending =
    complaints.filter(c => c.status === "Pending").length;

  const progress =
    complaints.filter(c => c.status === "In Progress").length;

  const resolved =
    complaints.filter(c => c.status === "Resolved").length;

  return (

    <div className="container py-4">

      <div className="text-center mb-4">

        <h2 className="fw-bold">
          <i className="bi bi-person-lines-fill me-2"></i>
          Citizen Complaint Tracker
        </h2>

        <p className="text-muted">
          Search and track your complaint status in real time
        </p>

      </div>

      <div className="row justify-content-center mb-4">

        <div className="col-lg-8">

          <div className="card shadow-lg border-0 rounded-4">

            <div className="card-body p-4">

              <div className="row">

                <div className="col-md-5">

                  <label className="form-label fw-semibold">
                    Complaint ID
                  </label>

                  <input
                    className="form-control form-control-lg"
                    placeholder="Enter Complaint ID"
                    value={complaintId}
                    onChange={(e) => setComplaintId(e.target.value)}
                  />

                </div>

                <div className="col-md-2 text-center align-self-end">

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
                    placeholder="Enter Mobile Number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />

                </div>

              </div>

              <div className="text-center mt-4">

                <button
                  className="btn btn-primary px-5"
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

      {loading && (

        <div className="text-center">

          <div className="spinner-border text-primary"></div>

        </div>

      )}

      {complaints.length > 0 && (

        <>

          <div className="row mb-4">

            <div className="col-md-3">

              <div className="card text-center shadow">

                <div className="card-body">

                  <h6>Total</h6>

                  <h3>{complaints.length}</h3>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card text-center shadow">

                <div className="card-body">

                  <h6>Pending</h6>

                  <h3 className="text-danger">{pending}</h3>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card text-center shadow">

                <div className="card-body">

                  <h6>In Progress</h6>

                  <h3 className="text-warning">{progress}</h3>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card text-center shadow">

                <div className="card-body">

                  <h6>Resolved</h6>

                  <h3 className="text-success">{resolved}</h3>

                </div>

              </div>

            </div>

          </div>

          <div className="row">

            {complaints.map((c) => (

              <div
                className="col-12 mb-3"
                key={c.complaintId}
              >

                <div className="card shadow border-0 rounded-4">

                  <div className="card-body">

                    <div className="d-flex justify-content-between">

                      <h5>

                        #{c.complaintId} — {c.title}

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

                    <div className="mt-3 p-3 bg-light rounded">

                      <strong>Description</strong>

                      <p className="mb-0">

                        {c.description}

                      </p>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </>

      )}

    </div>

  );

}

export default TrackComplaint;