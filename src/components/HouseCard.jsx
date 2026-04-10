import "./HouseCard.css";

const HouseCard = ({ item, onClick }) => {
  return (
    <div
      className="HouseCard"
      onClick={onClick}
      style={{ cursor: "pointer", border: "1px solid", marginBottom: "10px" }}
    >
      <p>id: {item.id}</p>
      <p>house id: {item.house.id}</p>
      <p>house 읍/면/동: {item.house.regionName}</p>
      <p>house 리: {item.house.regionDetail}</p>
      <p>house 면적: {item.house.area}</p>
      <p>house 주택유형: {item.house.housetype}</p>
      <p>house 빈집 상태 등급: {item.house.grade}</p>
      <p>house 관리 기관명: {item.house.manager}</p>
      <p>house 전화번호: {item.house.phone}</p>

      <p>위도: {item.latitude}</p>
      <p>경도: {item.longitude}m2</p>
      <p>편의시설갯수: {item.facilityCount}m2</p>
      <p>유동인구수준: {item.crowd}</p>
      <p>연령대별 방문 비율 정보: {item.targetAgeRatio}</p>
      <p>가격: {item.price}</p>
      <p>점수: {item.score}</p>
    </div>
  );
};

export default HouseCard;
