import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";

const MoveMap = ({ selectedHouse }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedHouse) {
      const lat = selectedHouse.house.latitude;
      const lng = selectedHouse.house.longitude;

      // 👉 선택되면 오른쪽으로 이동
      map.flyTo([lat, lng - 0.1], 11);
    } else {
      // 👉 닫히면 원래 위치로
      map.flyTo([36.8757, 128.624], 11); // 🔥 초기 center 값
    }
  }, [selectedHouse]);

  return null;
};

const Map = ({ houses, selectedHouse }) => {
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

  const defaultIcon = L.divIcon({
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
    iconSize: [20, 20],
    iconAnchor: [10, 20],
  });

  const selectedIcon = L.divIcon({
    html: `
    <div style="transform: translate(-50%, -100%);">
     <svg width="32" height="32" viewBox="0 0 46 46" fill="none">
  <path
    d="M40.25 19.1667C40.25 32.5834 23 44.0834 23 44.0834C23 44.0834 5.75 32.5834 5.75 19.1667C5.75 14.5918 7.56741 10.2042 10.8024 6.96915C14.0374 3.73415 18.425 1.91675 23 1.91675C27.575 1.91675 31.9626 3.73415 35.1976 6.96915C38.4326 10.2042 40.25 14.5918 40.25 19.1667Z"
    fill="#900B09"              // 🔥 추가
    stroke="#900B09"
    strokeWidth="2.5"
  />

  <path
    d="M23 24.9167C26.1756 24.9167 28.75 22.3424 28.75 19.1667C28.75 15.9911 26.1756 13.4167 23 13.4167C19.8244 13.4167 17.25 15.9911 17.25 19.1667C17.25 22.3424 19.8244 24.9167 23 24.9167Z"
    fill="white"               // 🔥 안쪽 원 (추천)
    stroke="#900B09"
    strokeWidth="2.5"
  />
</svg>
    </div>
  `,
    className: "",
    iconSize: [20, 20],
    iconAnchor: [10, 20],
  });

  return (
    <MapContainer
      center={[36.8757, 128.624]} // 영주시
      zoom={11}
      style={{ width: "100%", height: "100%" }}
      dragging={false} // 🔥 드래그 금지
      scrollWheelZoom={false} // 🔥 휠 줌 금지
      doubleClickZoom={false} // 🔥 더블클릭 줌 금지
      zoomControl={false} // 🔥 + - 버튼 제거
      touchZoom={false} // 🔥 모바일 줌 금지
      boxZoom={false} // 🔥 박스 줌 금지
      keyboard={false} // 🔥 키보드 이동 금지
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MoveMap selectedHouse={selectedHouse} />
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
      {houses.map((item) => {
        const isSelected =
          selectedHouse && item.house.id === selectedHouse.house.id;

        return (
          <Marker
            key={item.house.id}
            position={[item.house.latitude, item.house.longitude]}
            icon={isSelected ? selectedIcon : defaultIcon}
          />
        );
      })}
    </MapContainer>
  );
};

export default Map;
