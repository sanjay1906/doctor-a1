import React, { useEffect, useRef } from "react";
import Config from "Config";
import axios from "axios";

const google = window.google;

var features = [
  {
    position: new google.maps.LatLng(22.258651999999998, 71.1923805)
  },
  {
    position: new google.maps.LatLng(23.240311, 72.6529741)
  },
  {
    position: new google.maps.LatLng(23.240311, 6529741)
  },
  {
    position: new google.maps.LatLng(23.2566797, 72.6469687)
  },
  {
    position: new google.maps.LatLng(23.8481797, 72.0873063)
  }
];

const Map = props => {
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      const map = new google.maps.Map(mapRef.current, props.options);
      const { lat, lng } = props.options.center;
      const latLng = `${lat},${lng}`;
      let url = `${Config.MAP_URL}&latlng=${encodeURIComponent(latLng)}`;
      const response = await axios.get(url);
      const infoWindow = new google.maps.InfoWindow();
      infoWindow.setPosition(props.options.center);
      infoWindow.setContent(
        (response.data.results[0] || {}).formatted_address || "Unknown"
      );
      infoWindow.open(map);
      for (var i = 0; i < features.length; i++) {
        var marker = new google.maps.Marker({
          position: features[i].position,
          map: map,
        });
      }
    })();
  }, []);

  return (
    <div
      style={{ flex: 1, height: 500, width: "100%", margin: "10px auto" }}
      ref={mapRef}
    />
  );
};
export default Map;
