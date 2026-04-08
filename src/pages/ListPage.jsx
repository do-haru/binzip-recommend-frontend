import "./ListPage.css";

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import HouseCard from "../components/HouseCard";

const ListPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("q") || "";

  const [inputValue, setInputValue] = useState(query);

  const [houses, setHouses] = useState([]);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const handleSearch = () => {
    if (!inputValue.trim()) return;
    navigate(`/list?q=${encodeURIComponent(inputValue)}`);
  };

  // 추천 결과 데이터 api 호출
  useEffect(() => {
    fetch("http://localhost:8080/api/houses/recommend-dto")
      .then((res) => res.json())
      .then((data) => {
        setHouses(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="ListPage">
      <h1>ListPage</h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button onClick={handleSearch}>검색</button>
      </div>

      <div>
        {houses.map((item) => (
          <HouseCard
            key={item.id}
            item={item}
            onClick={() => navigate(`/detail/${item.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default ListPage;
