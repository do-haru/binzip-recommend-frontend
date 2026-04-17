import "./HouseCard.css";

const HouseCard = ({ item, onClick, isSelected }) => {
  const { house, reasons, reasonText } = item;

  const typeText = house.houseType === "단독" ? "단독 주택" : "복합 건물";

  return (
    <div
      className={`HouseCard ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      {/* 주소 */}
      <h3 className="Title">
        {house.regionName} {house.regionDetail} {typeText}
      </h3>

      <div className="InfoSection">
        {/* 점수 */}
        <div className="BadgeRow">
          <span className="Badge">추천 점수</span>
          <span className="ScoreText">{house.score}점</span>
        </div>

        {/* 이유 */}
        <div className="ReasonRow">
          <span className="Badge">추천 이유</span>
          <span className="ReasonText">{reasonText}</span>
        </div>
      </div>

      <div className="TagList">
        {reasons.map((r, idx) => (
          <span key={idx} className="Tag">
            {r}
          </span>
        ))}
      </div>

      <div className="Price">
        <span className="PriceBadge">예상 가격</span>
        <span className="PriceValue">{house.price.toLocaleString()}만 원</span>
      </div>
    </div>
  );
};

export default HouseCard;
