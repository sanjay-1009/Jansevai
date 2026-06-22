function AIInsights({ complaints }) {

  const total =
    complaints.length;

  const road =
    complaints.filter(
      c => c.category === "Road"
    ).length;

  const water =
    complaints.filter(
      c => c.category === "Water"
    ).length;

  const garbage =
    complaints.filter(
      c => c.category === "Garbage"
    ).length;

  const electricity =
    complaints.filter(
      c => c.category === "Electricity"
    ).length;

  const drainage =
    complaints.filter(
      c => c.category === "Drainage"
    ).length;

  const categories = [
    {name:"Road",count:road},
    {name:"Water",count:water},
    {name:"Garbage",count:garbage},
    {name:"Electricity",count:electricity},
    {name:"Drainage",count:drainage}
  ];

  const highest =
    categories.reduce(
      (a,b)=>
      a.count>b.count ? a : b
    );

  return (

    <div className="card shadow mb-4">

      <div className="card-body">

        <h4>
          🤖 AI Governance Insights
        </h4>

        <hr/>

        <p>
          Total Complaints:
          <strong>
            {" "}
            {total}
          </strong>
        </p>

        <p>
          Highest Complaint Category:
          <strong>
            {" "}
            {highest.name}
          </strong>
        </p>

        <p>
          AI Recommendation:
        </p>

        <div className="alert alert-warning">

          Deploy additional field
          teams to handle
          <strong>
            {" "}
            {highest.name}
          </strong>
          {" "}related complaints.

        </div>

      </div>

    </div>

  );
}

export default AIInsights;