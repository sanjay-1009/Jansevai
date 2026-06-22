import { useEffect, useState } from "react";
import axios from "axios";
import StatsCards from "../components/StatsCards";
import TamilNaduHeatMap from "../components/TamilNaduHeatMap";
import AIInsights from "../components/AIInsights";
import DashboardAnalytics
from "../components/DashboardAnalytics";


function AdminDashboard() {

  const [complaints,setComplaints] =
    useState([]);

  const [selectedCategory,setSelectedCategory] =
    useState("All");

const [selectedDepartment,setSelectedDepartment] =
    useState("All");

const [locationSearch,setLocationSearch] =
    useState("");

  const loadComplaints =
    async ()=>{

      const response =
        await axios.get(
          "http://localhost:8080/api/complaints"
        );

      setComplaints(
        response.data
      );
    };

  const updateStatus =
    async(id,status)=>{

      await axios.put(
        `http://localhost:8080/api/complaints/${id}/${status}`
      );

      loadComplaints();
    };

  useEffect(()=>{
    loadComplaints();
  },[]);

  const filteredComplaints =
complaints.filter(c => {

  const categoryMatch =
  selectedCategory === "All"
  ||
  c.category === selectedCategory;

  const departmentMatch =
  selectedDepartment === "All"
  ||
  c.department === selectedDepartment;

  const locationMatch =
  locationSearch === ""
  ||
  (
    c.locationName &&
    c.locationName
    .toLowerCase()
    .includes(
      locationSearch.toLowerCase()
    )
  );

  return (
    categoryMatch
    &&
    departmentMatch
    &&
    locationMatch
  );

});

const deleteComplaint =
async(id)=>{

  if(
    !window.confirm(
      "Delete Complaint?"
    )
  ) return;

  await axios.delete(
    `http://localhost:8080/api/complaints/${id}`
  );

  loadComplaints();

};

  return (

    <div className="container mt-5">

      <div className="mb-4">

  <h2>
    Smart Governance Dashboard
  </h2>

  <p className="text-muted">
    AI Powered Public Complaint Monitoring System
  </p>

</div>

      <StatsCards complaints={complaints}/>

      <AIInsights
  complaints={filteredComplaints}
/>

      <div className="card shadow mb-4">

  <div className="card-body">

    <h4>
      Tamil Nadu Complaint Heat Map
    </h4>

   <TamilNaduHeatMap
  complaints={filteredComplaints}
/>

<DashboardAnalytics
  complaints={filteredComplaints}
/>

  </div>

</div>

      <div className="card shadow mb-4">
  <div className="card-body">
    <h4>Tamil Nadu Complaint Map</h4>

   
  </div>
</div>

      <div className="row mb-4">

  <div className="col-md-4">

    <select
      className="form-select"
      value={selectedCategory}
      onChange={(e)=>
        setSelectedCategory(
          e.target.value
        )
      }
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
      onChange={(e)=>
        setSelectedDepartment(
          e.target.value
        )
      }
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
      onChange={(e)=>
        setLocationSearch(
          e.target.value
        )
      }
    />

  </div>

</div>

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

        {
          filteredComplaints.map(c=>(
            <tr key={c.id}>

              <td>{c.id}</td>

<td>{c.title}</td>

<td>
  <span className="badge bg-info">
    {c.category}
  </span>
</td>

<td>{c.department}</td>

<td>

  {
    c.priority === "High"
    ?

    <span className="badge bg-danger">
      High
    </span>

    :

    <span className="badge bg-warning text-dark">
      {c.priority}
    </span>
  }

</td>

<td>

  {
    c.locationName
    ?
    c.locationName
    :
    "Unknown"
  }

</td>

<td>

  {
    c.locationVerified
    ?

    <span className="badge bg-success">
      Verified
    </span>

    :

    <span className="badge bg-secondary">
      Not Verified
    </span>
  }

</td>

<td>

  {
    c.createdAt
    ?
    new Date(
      c.createdAt
    ).toLocaleString()
    :
    "-"
  }

</td>

<td>{c.status}</td>

<td>

  <div className="d-flex gap-2 justify-content-center">

    <button
      className="btn btn-warning btn-sm"
      onClick={() =>
        updateStatus(
          c.id,
          "In Progress"
        )
      }
    >
      Start
    </button>

    <button
      className="btn btn-success btn-sm"
      onClick={() =>
        updateStatus(
          c.id,
          "Resolved"
        )
      }
    >
      Resolve
    </button>

    <button
      className="btn btn-danger btn-sm"
      onClick={() =>
        deleteComplaint(c.id)
      }
    >
      Delete
    </button>

  </div>

</td>

            </tr>
          ))
        }

        </tbody>

      </table>

    </div>
  );
}

export default AdminDashboard;