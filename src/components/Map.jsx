import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";

const Map = ({ houses }) => {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch("/data/geo.geojson")
      .then((res) => res.json())
      .then((data) => setGeoData(data));
  }, []);

  const filteredData = geoData && {
    ...geoData,
    features: geoData.features.filter((f) =>
      f.properties.adm_nm.includes("영주시"),
    ),
  };

  const customIcon = L.divIcon({
    html: `
    <div style="transform: translate(-50%, -100%);">
      <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0)">
          <path d="M14 6.66675C14 11.3334 8 15.3334 8 15.3334C8 15.3334 2 11.3334 2 6.66675C2 5.07545 2.63214 3.54933 3.75736 2.42411C4.88258 1.29889 6.4087 0.666748 8 0.666748C9.5913 0.666748 11.1174 1.29889 12.2426 2.42411C13.3679 3.54933 14 5.07545 14 6.66675Z" stroke="#1E1E1E" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8 8.66675C9.10457 8.66675 10 7.77132 10 6.66675C10 5.56218 9.10457 4.66675 8 4.66675C6.89543 4.66675 6 5.56218 6 6.66675C6 7.77132 6.89543 8.66675 8 8.66675Z" stroke="#1E1E1E" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      </svg>
    </div>
  `,
    className: "", // 기본 아이콘 제거
    iconSize: [24, 24],
  });

  return (
    <MapContainer
      center={[36.8757, 128.624]} // 영주시
      zoom={11}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geoData && (
        <GeoJSON
          data={filteredData}
          style={{
            color: "black",
            weight: 2,
            fillOpacity: 0.2,
          }}
        />
      )}
      {houses.map((item) => (
        <Marker
          key={item.house.id}
          position={[item.house.latitude, item.house.longitude]}
          icon={customIcon}
        >
          <Popup>
            {item.house.regionName} {item.house.regionDetail}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
