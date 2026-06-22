function AIResultCard({ result }) {

  if (!result) return null;

  return (
    <div className="card mt-3 shadow">
      <div className="card-body">

        <h4>AI Analysis</h4>

        <p>
          <strong>Category:</strong>
          {" "}
          {result.category}
        </p>

        <p>
          <strong>Department:</strong>
          {" "}
          {result.department}
        </p>

        <p>
          <strong>Priority:</strong>
          {" "}
          {result.priority}
        </p>

      </div>
    </div>
  );
}

export default AIResultCard;