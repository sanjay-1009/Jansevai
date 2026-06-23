function LocationFilter({
  locations,
  selectedLocation,
  setSelectedLocation
}) {
  return (
    <select
      className="form-select"
      value={selectedLocation}
      onChange={(e) =>
        setSelectedLocation(e.target.value)
      }
    >
      <option value="">All Locations</option>

      {locations.map((loc, index) => (
        <option key={index} value={loc}>
          {loc}
        </option>
      ))}
    </select>
  );
}

export default LocationFilter;