import React from "react";
import { Map, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

/**
 * small, interactive map thumbnail showing a single business's location
 * @param {*} latitude - business latitude
 * @param {*} longitude - business longitude
 */
const MiniMap = ({ latitude, longitude }) => {
  if (!latitude || !longitude) {
    return null;
  }
  return (
    <Map
      center={[latitude, longitude]}
      zoom={14}
      style={{ height: "100px", width: "70" }}
      dragging={true}
      touchZoom={true}
      scrollWheelZoom={true}
      doubleClickZoom={true}
      zoomControl={false}
      attributionControl={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[latitude, longitude]} />
    </Map>
  );
};

export default MiniMap;
