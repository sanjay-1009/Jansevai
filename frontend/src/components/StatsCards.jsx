function StatsCards({ complaints }) {

  const total = complaints.length;

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

  const highPriority =
    complaints.filter(
      c => c.priority === "High"
    ).length;

  return (

    <div className="row mb-4">

  <div className="col-md-3">
    <div className="card shadow-sm">
      <div className="card-body text-center">
        <h6>Total Complaints</h6>
        <h2>{total}</h2>
      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card shadow-sm">
      <div className="card-body text-center">
        <h6>Pending</h6>
        <h2>{pending}</h2>
      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card shadow-sm">
      <div className="card-body text-center">
        <h6>In Progress</h6>
        <h2>{progress}</h2>
      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card shadow-sm">
      <div className="card-body text-center">
        <h6>Resolved</h6>
        <h2>{resolved}</h2>
      </div>
    </div>
  </div>

</div>

  );

}

export default StatsCards;