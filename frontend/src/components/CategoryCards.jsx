function CategoryCards({ complaints }) {

  const categories = {};

  complaints.forEach(c => {
    categories[c.category] =
      (categories[c.category] || 0) + 1;
  });

  return (
    <div className="row mb-4">

      {Object.entries(categories).map(
        ([category,count]) => (

          <div
            className="col-md-3 mb-3"
            key={category}
          >
            <div className="card shadow-sm">

              <div className="card-body text-center">

                <h6>{category}</h6>

                <h2>{count}</h2>

              </div>

            </div>
          </div>

        )
      )}

    </div>
  );
}

export default CategoryCards;