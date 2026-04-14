import { MapContainer, TileLayer } from "react-leaflet";

const Map = () => {
  return (
    <MapContainer
      center={[36.8057, 128.624]} // 영주시
      zoom={13}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default Map;
