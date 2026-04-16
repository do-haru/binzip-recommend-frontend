import "./DetailPanel.css";

const DetailPanel = ({ item, onClose }) => {
  const typeText = item.house.houseType === "단독" ? "단독 주택" : "복합 건물";

  return (
    <div
      className="DetailPanel"
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        background: "red",
        padding: "20px",
        zIndex: 999,
      }}
    >
      <div className="DetailHeader">
        <button className="CloseBtn" onClick={onClose}>
          ×
        </button>
        <h3 className="DetailTitle">
          {item.house.regionName} {item.house.regionDetail} {typeText}
        </h3>
      </div>

      <div className="DetailContent">Detail 내용</div>
    </div>
  );
};

export default DetailPanel;
