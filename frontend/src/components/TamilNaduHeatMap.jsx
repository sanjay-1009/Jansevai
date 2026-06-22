import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON
} from "react-leaflet";

function TamilNaduHeatMap({ complaints }) {

  const [geoData, setGeoData] =
    useState(null);

  useEffect(() => {

    fetch("/TamilNadu.geojson")
      .then(res => res.json())
      .then(data => {

        console.log(data);

        setGeoData(data);

      });

  }, []);

  if (!geoData)
    return <h5>Loading Map...</h5>;

  const districtCounts = {};

  complaints.forEach(c => {

    if (!c.district)
      return;

    districtCounts[c.district] =
      (districtCounts[c.district] || 0) + 1;

  });

  const getColor = (count) => {

    if (count > 15)
      return "#dc2626";

    if (count > 10)
      return "#f97316";

    if (count > 5)
      return "#eab308";

    return "#22c55e";
  };

  return (

    <>

      <MapContainer
  center={[10.7905,78.7047]}
  zoom={7}
  minZoom={7}
  maxBounds={[
    [7.5, 76.0],   // South-West Tamil Nadu
    [13.8, 80.5]   // North-East Tamil Nadu
  ]}
  maxBoundsViscosity={1.0}
  style={{
    height:"600px",
    width:"100%"
  }}
>

       {/* <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />*/}

        <GeoJSON

          data={geoData}

          style={(feature) => {

            const districtName =

              feature.properties.Dist_Name ||
              feature.properties.district ||
              feature.properties.DISTRICT ||
              "";

            const count =
              districtCounts[districtName] || 0;

            return {

              fillColor:
                getColor(count),

              fillOpacity: 0.7,

              weight: 1,

              color: "#444"

            };

          }}

          onEachFeature={
            (feature, layer) => {

              const districtName =

                feature.properties.Dist_Name ||
                feature.properties.district ||
                feature.properties.DISTRICT ||
                "Unknown";

              const count =
                districtCounts[districtName] || 0;

              layer.bindPopup(

                `
                <b>${districtName}</b>
                <br/>
                Complaints: ${count}
                `

              );

            }
          }

        />

      </MapContainer>

      <div className="mt-3">

        <span className="badge bg-success me-2">
          Low (0-5)
        </span>

        <span className="badge bg-warning text-dark me-2">
          Medium (6-10)
        </span>

        <span
          className="badge me-2"
          style={{
            background:"#f97316"
          }}
        >
          High (11-15)
        </span>

        <span className="badge bg-danger">
          Critical (15+)
        </span>

      </div>

    </>

  );

}

export default TamilNaduHeatMap;