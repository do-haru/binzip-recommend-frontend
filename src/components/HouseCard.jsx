import "./HouseCard.css";

const HouseCard = ({ item, onClick }) => {
  return (
    <div
      className="HouseCard"
      onClick={onClick}
      style={{ cursor: "pointer", border: "1px solid", marginBottom: "10px" }}
    >
      <p>위치: {item.location}</p>
      <p>면적: {item.area}m2</p>
      <p>이유: {item.reason}</p>
    </div>
  );
};

export default HouseCard;
