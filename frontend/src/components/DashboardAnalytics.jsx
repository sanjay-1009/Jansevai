function DashboardAnalytics({ complaints }) {

  const districtCounts = {};

  const categoryCounts = {};

  complaints.forEach(c => {

    if(c.district){

      districtCounts[c.district] =
      (districtCounts[c.district] || 0) + 1;

    }

    if(c.category){

      categoryCounts[c.category] =
      (categoryCounts[c.category] || 0) + 1;

    }

  });

  const topDistricts =
    Object.entries(districtCounts)
    .sort((a,b)=>b[1]-a[1])
    .slice(0,5);

  const topCategories =
    Object.entries(categoryCounts)
    .sort((a,b)=>b[1]-a[1])
    .slice(0,5);

  return (

    <div className="row mb-4">

      <div className="col-md-6">

        <div className="card shadow h-100">

          <div className="card-body">

            <h4>
              📍 Top Districts
            </h4>

            <hr/>

            {
              topDistricts.map(
                ([district,count]) => (

                  <div
                    key={district}
                    className="d-flex justify-content-between mb-2"
                  >

                    <span>
                      {district}
                    </span>

                    <span className="badge bg-primary">
                      {count}
                    </span>

                  </div>

                )
              )
            }

          </div>

        </div>

      </div>

      <div className="col-md-6">

        <div className="card shadow h-100">

          <div className="card-body">

            <h4>
              📊 Top Categories
            </h4>

            <hr/>

            {
              topCategories.map(
                ([category,count]) => (

                  <div
                    key={category}
                    className="d-flex justify-content-between mb-2"
                  >

                    <span>
                      {category}
                    </span>

                    <span className="badge bg-success">
                      {count}
                    </span>

                  </div>

                )
              )
            }

          </div>

        </div>

      </div>

    </div>

  );
}

export default DashboardAnalytics;