import "./DetailPage.css";

import { useParams } from "react-router-dom";

import { houses } from "../data/houses";

const DetailPage = () => {
  const { id } = useParams();

  const house = houses.find((item) => item.id === Number(id));

  if (!house) return <div>데이터 없음</div>;

  return (
    <div className="DetailPage">
      <h1>상세 페이지</h1>
      <p>위치: {house.location}</p>
      <p>면적: {house.area}㎡</p>
      <p>이유: {house.reason}</p>
    </div>
  );
};

export default DetailPage;
