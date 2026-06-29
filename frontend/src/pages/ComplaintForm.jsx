import { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as turf from "@turf/turf";

function ComplaintForm() {

  const locationWatcherRef = useRef(null);

  const [geoData, setGeoData] = useState(null);
  const [locationAccuracy, setLocationAccuracy] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [citizenName, setCitizenName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [district, setDistrict] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationVerified, setLocationVerified] = useState(false);
  const [complaintId, setComplaintId] = useState("");
  

  useEffect(() => {
    fetch("/TamilNadu.geojson")
      .then((res) => res.json())
      .then((data) => {
        setGeoData(data);
      });

    return () => {
      if (locationWatcherRef.current !== null) {
        navigator.geolocation.clearWatch(locationWatcherRef.current);
      }
    };
  }, []);

const getDistrictFromCoords = (lat, lng) => {
  if (!geoData) return null;

  const point = turf.point([lng, lat]);

  for (let feature of geoData.features) {
    const isInside = turf.booleanPointInPolygon(point, feature);

    if (isInside) {
      return (
        feature.properties.Dist_Name ||
        feature.properties.DISTRICT ||
        feature.properties.district ||
        "Unknown District"
      );
    }
  }

  return null;
};

const getLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  setLocationAccuracy(null);
  setShowLocationModal(false);

  const startTime = Date.now();
  const maxWaitMs = 25000;
  const desiredAccuracy = 100;
  let bestPosition = null;

  const handlePosition = async (position) => {
    if (!position) {
      alert("Unable to get a location fix. Please try again.");
      return;
    }

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const accuracy = position.coords.accuracy;

    console.log("ACCURACY (meters):", accuracy);

    setLatitude(lat);
    setLongitude(lon);
    setLocationAccuracy(accuracy);

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );

      const data = response.data;
      const address = data?.address || {};
      const place = data?.display_name || data?.name || "Unknown Location";

      setPlaceName(place);

      const detectedDistrict =
        getDistrictFromCoords(lat, lon) ||
        address.city_district ||
        address.suburb ||
        address.town ||
        address.village ||
        address.county ||
        address.state_district ||
        address.state ||
        "Unknown District";

      setDistrict(detectedDistrict);
      setShowLocationModal(true);

      if (accuracy > 50000) {
        alert(
          "Location accuracy is low. Please move to an open area and try again for better GPS precision."
        );
      }
    } catch (err) {
      console.log("Reverse geocoding error:", err);
      setPlaceName("Location detected but address unavailable");
      setDistrict(getDistrictFromCoords(lat, lon) || "Unknown District");
      setShowLocationModal(true);
    }
  };

  const watcherId = navigator.geolocation.watchPosition(
    (position) => {
      if (!bestPosition || position.coords.accuracy < bestPosition.coords.accuracy) {
        bestPosition = position;
        setLocationAccuracy(position.coords.accuracy);
      }

      if (
        position.coords.accuracy <= desiredAccuracy ||
        Date.now() - startTime >= maxWaitMs
      ) {
        navigator.geolocation.clearWatch(watcherId);
        locationWatcherRef.current = null;
        handlePosition(bestPosition || position);
      }
    },
    (error) => {
      console.log(error);
      if (locationWatcherRef.current !== null) {
        navigator.geolocation.clearWatch(locationWatcherRef.current);
        locationWatcherRef.current = null;
      }
      alert("Location permission denied or unable to determine position.");
    },
    {
      enableHighAccuracy: true,
      timeout: maxWaitMs,
      maximumAge: 0
    }
  );

  locationWatcherRef.current = watcherId;
};
  const analyzeComplaint =
    async () => {

      try {

        const response =
          await axios.post(

            "http://localhost:8080/api/complaints/classify",

            description,

            {
              headers: {
                "Content-Type":
                  "text/plain"
              }
            }
          );

        let result =
          response.data;

        result =
          result
            .replace("```json", "")
            .replace("```", "");

        setAnalysis(
          JSON.parse(result)
        );

      }
      catch (error) {

        console.log(error);

        alert(
          "AI Analysis Failed"
        );

      }

    };

  const submitComplaint =
  async () => {

    try {

      let imageUrl = "";

      if(image){

        const formData =
          new FormData();

        formData.append(
          "file",
          image
        );

        const uploadResponse =
          await axios.post(
            "http://localhost:8080/api/upload",
            formData,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data"
              }
            }
          );

        imageUrl =
          uploadResponse.data.imageUrl;

        console.log(
          "S3 Image URL:",
          imageUrl
        );
      }

      const data = {

          citizenName,
mobileNumber,

          title,
          description,

          category:
            analysis?.category ||
            "Unknown",

          department:
            analysis?.department ||
            "Unknown",

          priority:
            analysis?.priority ||
            "Low",

          latitude,
          longitude,

          locationName:
            placeName,

          locationVerified,

          district,

          createdAt:
  new Date()
    .toISOString(),

imageUrl:
  imageUrl

        };
        

        const response =
  await axios.post(
    "http://localhost:8080/api/complaints",
    data
  );

  const id =
  typeof response.data === "string"
    ? response.data
    : response.data?.complaintId || response.data?.id;

setSuccessMessage(
  `Complaint Registered Successfully. Your Complaint ID is #${id}`
);

        setCitizenName("");
setMobileNumber("");

        setTitle("");
        setDescription("");

        setLatitude("");
        setLongitude("");

        setPlaceName("");
        setDistrict("");

        setAnalysis(null);

        setLocationVerified(false);

        setImage(null);

      }
      catch (error) {

        console.log(error);

        alert(
          "Complaint Submission Failed"
        );

      }

    };
    

  return (

    <div className="container-fluid px-5 py-4">

      <div className="text-center mb-5">

        <div className="card shadow-lg border-0 mb-4">

 <div className="card-body">

  <h1 className="fw-bold">
    <i className="bi bi-buildings-fill me-2 text-primary"></i>

    JanSevai AI

  </h1>

  <p className="text-muted mb-0">

   AI Powered Smart Governance Platform

  </p>

 </div>

</div>

        {
 successMessage &&

 <div
  className="card border-success shadow mb-4"
 >
  <div className="card-body">

   <h4 className="text-success">
    ✅ Complaint Registered Successfully
   </h4>

   <hr/>

   <p>
    {successMessage}
   </p>

   <p>
    Please save your Complaint ID
    for future tracking.
   </p>

  </div>
 </div>
}

      </div>

      <div className="row g-4">

  {/* Citizen Card */}

  <div className="col-lg-4">

    <div className="bento-card h-100">

      <h4 className="section-title">
          <i className="bi bi-person-vcard-fill me-2 text-primary"></i>
         Citizen Details
      </h4>

      <input
        className="modern-input"
        placeholder="Citizen Name"
        value={citizenName}
        onChange={(e)=>
          setCitizenName(e.target.value)
        }
      />

      <input
        className="modern-input"
        placeholder="Mobile Number"
        value={mobileNumber}
        onChange={(e)=>
          setMobileNumber(e.target.value)
        }
      />

      <div className="district-chip">

        📍 {district || "District Not Detected"}

      </div>

    </div>

  </div>

  {/* AI Card */}

  <div className="col-lg-4">

    <div className="bento-card h-100 ai-card">

      <h4 className="section-title">
         <i className="bi bi-cpu-fill me-2 text-info"></i>

         AI Analysis
      </h4>

      {

        analysis ?

        <>

          <div className="analysis-chip category">
            <i className="bi bi-cone-striped me-2"></i>

             {analysis.category}

          </div>

          <div className="analysis-chip department">
            <i className="bi bi-building me-2"></i>


             {analysis.department}

          </div>

          <div className="analysis-chip priority">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>

             {analysis.priority}

          </div>

        </>

        :

        <div className="empty-state">

          Analyze complaint to get AI insights

        </div>

      }

    </div>

  </div>

  {/* Location Card */}

  <div className="col-lg-4">

    <div className="bento-card h-100">

      <h4 className="section-title">
         <i className="bi bi-geo-alt-fill me-2 text-danger"></i>

         Location

      </h4>

      <div className="location-box">
        {placeName ? placeName : "Location Not Detected"}
      </div>
      <div className="location-accuracy text-muted mt-2">
        {locationAccuracy != null
          ? `Accuracy: ${Math.round(locationAccuracy)} meters`
          : "Accuracy not yet measured"}
      </div>

      {

        locationVerified &&

        <div className="verified-badge">
          <i className="bi bi-patch-check-fill me-2"></i>


          

          Location Verified

        </div>

      }

    </div>

  </div>

  {/* Complaint Card */}

  <div className="col-12">

    <div className="bento-card">

      <h4 className="section-title">
         <i className="bi bi-file-earmark-text-fill me-2 text-success"></i>


         Complaint Details

      </h4>

      <input
        className="modern-input"
        placeholder="Complaint Title"
        value={title}
        onChange={(e)=>
          setTitle(e.target.value)
        }
      />

      <textarea
        className="modern-textarea"
        rows="6"
        placeholder="Describe your issue..."
        value={description}
        onChange={(e)=>
          setDescription(e.target.value)
        }
      />

      <input
        type="file"
        className="modern-input"
        onChange={(e)=>
          setImage(
            e.target.files[0]
          )
        }
      />

    </div>

  </div>

  {/* Action Buttons */}

  <div className="col-12">

    <div className="action-panel">

      <button
        className="action-btn location-btn"
        onClick={getLocation}
      >
         <i className="bi bi-crosshair2 me-2"></i>

         Get Location
      </button>

      <button
        className="action-btn ai-btn"
        onClick={analyzeComplaint}
      >
        <i className="bi bi-magic me-2"></i>
         Analyze AI
      </button>

      <button
        className="action-btn submit-btn"
        onClick={() => {
          if (!title || !description || !citizenName || !mobileNumber) {
            alert("Please fill all required fields before previewing the complaint.");
            return;
          }
          setShowPreviewModal(true);
        }}
      >
        <i className="bi bi-send-check-fill me-2"></i>
         Preview & Submit
      </button>

    </div>

  </div>

</div>

      {/* Location Modal */}

      {
        showLocationModal &&

        <div
          className="modal d-block"
          tabIndex="-1"
        >

          <div
            className="modal-dialog"
          >

            <div
              className="modal-content"
            >

              <div
                className="modal-header"
              >

                <h5>
                  Location Verification
                </h5>

              </div>

              <div
                className="modal-body"
              >

                <p>

                  📍 {placeName}

                </p>

                <p>

                  Are you currently
                  at the complaint location?

                </p>

              </div>

              <div
                className="modal-footer"
              >

                <button

                  className="btn btn-success"

                  onClick={() => {

                    setLocationVerified(
                      true
                    );

                    setShowLocationModal(
                      false
                    );

                  }}
                >

                  Yes

                </button>

                <button

                  className="btn btn-danger"

                  onClick={() => {

                    setLocationVerified(
                      false
                    );

                    setShowLocationModal(
                      false
                    );

                  }}
                >

                  No

                </button>

              </div>

            </div>

          </div>

        </div>

      }
      {
showPreviewModal &&

<div
 className="modal d-block"
 tabIndex="-1"
>

 <div className="modal-dialog modal-lg">

  <div className="modal-content">

   <div className="modal-header">

    <h4>
     Complaint Preview
    </h4>

    <button
     className="btn-close"
     onClick={() => {
       setShowPreviewModal(false);
     }}
    />

   </div>

   <div className="modal-body">

    <div className="card border-0">

     <div className="card-body">

      <h5 className="mb-3">
       Citizen Information
      </h5>

      <p>
       <strong>Name:</strong>
       {" "}
       {citizenName}
      </p>

      <p>
       <strong>Mobile:</strong>
       {" "}
       {mobileNumber}
      </p>

      <hr/>

      <h5 className="mb-3">
       Complaint Information
      </h5>

      <p>
       <strong>Title:</strong>
       {" "}
       {title}
      </p>

      <p>
       <strong>Description:</strong>
       {" "}
       {description}
      </p>

      <p>
       <strong>District:</strong>
       {" "}
       {district}
      </p>

      <p>
       <strong>Location:</strong>
       {" "}
       {placeName}
      </p>

      {
 image &&

 <div className="mb-3">

  <strong>Evidence Image:</strong>

  <br/>

  <img
   src={URL.createObjectURL(image)}
   alt="Preview"
   style={{
    maxWidth: "250px",
    borderRadius: "10px"
   }}
  />

 </div>
}

      <hr/>

      <h5 className="mb-3">
       AI Analysis
      </h5>

      <p>
       <strong>Category:</strong>
       {" "}
       {analysis?.category}
      </p>

      <p>
       <strong>Department:</strong>
       {" "}
       {analysis?.department}
      </p>

      <p>
       <strong>Priority:</strong>
       {" "}
       {analysis?.priority}
      </p>

      <p>
       <strong>Location Verified:</strong>
       {" "}

       {
        locationVerified
        ?

        <span className="badge bg-success">
         Verified
        </span>

        :

        <span className="badge bg-danger">
         Not Verified
        </span>
       }

      </p>

     </div>

    </div>

   </div>

   <div className="modal-footer">

    <button
     className="btn btn-secondary"
     onClick={() =>
      setShowPreviewModal(false)
     }
    >
     Edit
    </button>

    <button
     className="btn btn-success"
     onClick={async () => {

      await submitComplaint();

      setShowPreviewModal(false);

     }}
    >
     Confirm & Submit
    </button>

   </div>

  </div>

 </div>

</div>
}

    </div>

  );

}

export default ComplaintForm;
