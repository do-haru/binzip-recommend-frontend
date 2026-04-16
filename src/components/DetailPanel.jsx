import "./DetailPanel.css";

const DetailPanel = ({ item, onClose }) => {
  const typeText = item.house.houseType === "단독" ? "단독 주택" : "복합 건물";

  const gradeTextMap = {
    1: "양호",
    2: "일반",
    3: "불량",
    4: "철거",
  };

  return (
    <div className="DetailPanel">
      <div className="DetailHeader">
        <div className="CloseRow">
          <button className="CloseBtn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="TitleBlock">
          <h3 className="DetailTitle">
            {item.house.regionName} {item.house.regionDetail} {typeText}
          </h3>

          <div className="TagSection">
            {item.reasons.map((reason, idx) => (
              <span key={idx} className="Tag">
                {reason}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="DetailContent">
        <div className="ScoreRow">
          <span className="GreenLabel">추천 점수</span>
          <span className="ScoreValue">{Math.round(item.house.score)}점</span>
        </div>
        <div className="ReasonRow">
          <span className="GreenLabel">추천 이유</span>
          <span className="ReasonText">{item.reasonText}</span>
        </div>
      </div>

      <div className="InfoSection">
        <div className="InfoRow">
          <span className="GrayLabel">면적</span>
          <span className="InfoText">{item.house.area} 제곱미터</span>
        </div>

        <div className="InfoRow">
          <span className="GrayLabel">집 등급</span>
          <span className="InfoText">
            {item.house.grade}등급 ({gradeTextMap[item.house.grade]})
          </span>
        </div>

        <div className="InfoRow">
          <span className="GrayLabel">예상 가격</span>
          <span className="InfoText">
            {item.house.price.toLocaleString()}만 원
          </span>
        </div>
        <div className="WarningText">
          ※ 주변 시세를 기반으로 해당 후보지의 예상 가격을 산출했어요. 실제 거래
          가격과 차이가 있을 수 있어요.
        </div>
      </div>

      <div className="EstateInfo">
        <div className="GrayLabel">주변 부동산 정보</div>

        <div className="EstateWarning">
          ※ 해당 후보지 주변의 부동산 정보를 함께 제공해요
          <br />
          상세 정보는 제공되지 않으므로, 부동산에 직접 문의해 매물 여부를
          확인해주세요
        </div>
      </div>
    </div>
  );
};

export default DetailPanel;
