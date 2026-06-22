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

    <div className="row g-3 mb-4">

      {/* Total */}

      <div className="col-md-3">

        <div
          className="card shadow border-0 h-100"
          style={{
            background:
            "linear-gradient(135deg,#2563eb,#1d4ed8)",
            color:"white"
          }}
        >

          <div className="card-body">
            <i class="bi bi-card-checklist"></i>
            <h6>
              
               Total Complaints
            </h6>

            <h1>
              {total}
            </h1>

          </div>

        </div>

      </div>

      {/* Pending */}

      <div className="col-md-3">

        <div
          className="card shadow border-0 h-100"
          style={{
            background:
            "linear-gradient(135deg,#f59e0b,#d97706)",
            color:"white"
          }}
        >

          <div className="card-body">
            <i class="bi bi-hourglass-split"></i>
            <h6>
               Pending
            </h6>

            <h1>
              {pending}
            </h1>

          </div>

        </div>

      </div>

      {/* Progress */}

      <div className="col-md-3">

        <div
          className="card shadow border-0 h-100"
          style={{
            background:
            "linear-gradient(135deg,#06b6d4,#0891b2)",
            color:"white"
          }}
        >

          <div className="card-body">
          <i class="bi bi-chevron-right"></i>
            <h6>
               In Progress
            </h6>

            <h1>
              {progress}
            </h1>

          </div>

        </div>

      </div>

      {/* Resolved */}

      <div className="col-md-3">

        <div
          className="card shadow border-0 h-100"
          style={{
            background:
            "linear-gradient(135deg,#22c55e,#15803d)",
            color:"white"
          }}
        >

          <div className="card-body">
            <i class="bi bi-chevron-double-right"></i>
            <h6>
               Resolved
            </h6>

            <h1>
              {resolved}
            </h1>

          </div>

        </div>

      </div>

      {/* High Priority Card */}

      <div className="col-md-12">

        <div
          className="card shadow border-0"
          style={{
            background:
            "linear-gradient(135deg,#ef4444,#b91c1c)",
            color:"white"
          }}
        >

          <div className="card-body">

            <div className="row">

              <div className="col-md-8">

                <h4>
                  🚨 High Priority Complaints
                </h4>

                <p>
                  Complaints requiring
                  immediate attention.
                </p>

              </div>

              <div className="col-md-4 text-end">

                <h1>
                  {highPriority}
                </h1>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default StatsCards;