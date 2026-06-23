function DepartmentFilter({
  departments,
  selectedDepartment,
  setSelectedDepartment
}) {
  return (
    <select
      className="form-select"
      value={selectedDepartment}
      onChange={(e) =>
        setSelectedDepartment(e.target.value)
      }
    >
      <option value="">All Departments</option>

      {departments.map((d, index) => (
        <option key={index} value={d}>
          {d}
        </option>
      ))}
    </select>
  );
}

export default DepartmentFilter;