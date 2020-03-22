import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { NetworkServices } from "Services";
import Config from "Config";

const Map = () => {
  const [viewPort, setViewport] = useState({
    latitude: "",
    longitude: "",
    zoom: 10
  });
  const [location, setLocation] = useState({
    lat: null,
    log: null
  });
  const [hospitals, setHospitals] = useState();
  const [showHospital, setShowHospital] = useState(false);
  const [selected, isSelected] = useState(null);

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const response = await NetworkServices.get(
          `${Config.SERVER_URL}/hospital`
        );
        const data = await response.data;
        setHospitals(data);
        setShowHospital(true);
      } catch (error) {
        console.error(error);
      }
    };
    fetchHospital();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        setLocation({
          lat: pos.coords.latitude,
          log: pos.coords.longitude
        });

        setViewport({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          zoom: 14
        });
      });
    } else {
      alert("Your Brower Not Support Geolocation");
    }
  }, []);

  const Token =
    "pk.eyJ1Ijoia2lzaGFucGF0ZWw4ODk5IiwiYSI6ImNrN3UycXk1aDExdGYzbW91cDU3MmtmbWkifQ._7OcYLqdEx_peUl12hGelA";
  return (
    <>
      {viewPort.latitude && viewPort.longitude ? (
        <ReactMapGL
          {...viewPort}
          width="100%"
          height="500px"
          mapStyle="mapbox://styles/mapbox/outdoors-v11"
          onViewportChange={viewport => setViewport(viewport)}
          mapboxApiAccessToken={Token}>
          {location.lat && location.log && (
            <div>
              <Marker latitude={location.lat} longitude={location.log}>
                <img
                  src="./images/marker.png"
                  style={{ height: "30px", width: "30px" }}
                  alt="Red-Marker"
                />
              </Marker>
            </div>
          )}

          {showHospital ? (
            <div>
              {hospitals.map((hospital, _id) => {
                return (
                  <div key={_id}>
                    <Marker
                      longitude={hospital.location.coordinates[0]}
                      latitude={hospital.location.coordinates[1]}>
                      <div
                        onClick={e => {
                          e.preventDefault();
                          isSelected(hospital);
                        }}>
                        <img
                          src="./images/hospital_Marker_icon.png"
                          style={{ height: "30px", width: "30px" }}
                          alt="hospital_location"
                        />
                      </div>
                    </Marker>
                    {selected ? (
                      <Popup
                        onClose={() => {
                          isSelected(null);
                        }}
                        latitude={selected.location.coordinates[1]}
                        longitude={selected.location.coordinates[0]}>
                        <div style={{ textAlign: "center" }}>
                          <h5>{selected.hospitalName}</h5>
                          <p>{selected.description}</p>
                        </div>
                      </Popup>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ) : null}
        </ReactMapGL>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "90vh"
          }}>
          <h1>Opps !! We Are Found You are not Allow Location Access..</h1>
        </div>
      )}
    </>
  );
};
export default Map;

// import React, { useEffect, useRef, useState } from "react";
// import Config from "Config";
// import axios from "axios";

// const google = window.google;

// const Map = props => {
//   const mapRef = useRef(null);
//   const [mapPermission, setMapPermission] = useState(null);
//   const [deseaseName, setDeseaseName] = useState(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       (async () => {
//         const permission = await navigator.permissions.query({
//           name: "geolocation"
//         });
//         setMapPermission(permission.state);
//         permission.onchange = () => {
//           setMapPermission(permission.state);
//         };
//       })();
//     }
//   }, []);

//   const handleSearch = () => {
//     // TODO : Validate search should not empty
//     // TODO : Search Nearby Hospital
//   };
//   return (
//     <div>Hello from map</div>
//     /* {state.isLoaded && (

//           <button type="submit" onSubmit={handleSearch}>Search</button>
//         {Boolean(mapPermission==='granted' && state.isLoaded) && (
//           <Map
//             options={{
//               center: { lat: state.latitude, lng: state.logitude },
//               zoom: 13
//             }}
//           />
//         )}
//         {Boolean(mapPermission!=='granted' && state.isLoaded) && (
//           <div>
//             <p>Please enable Geolocation permission</p>
//           </div>
//         )}
//       </> */
//   );
// };
// export default Map;
