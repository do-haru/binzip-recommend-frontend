import "./ListPage.css";

import { regions } from "../data/regions";

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import HouseCard from "../components/HouseCard";

const ListPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("q") || "";
  const regionParam = searchParams.get("region") || "";

  const [region, setRegion] = useState(regionParam);
  const [inputValue, setInputValue] = useState(query);

  const [houses, setHouses] = useState([]);

  useEffect(() => {
    setInputValue(query);
    setRegion(regionParam);
  }, [query, regionParam]);

  const handleSearch = () => {
    if (!inputValue.trim()) return;
    if (!region) return;
    navigate(
      `/list?q=${encodeURIComponent(query)}&region=${encodeURIComponent(region)}`,
    );
  };

  // 추천 결과 데이터 api 호출
  useEffect(() => {
    fetch(
      `http://localhost:8080/api/houses/test1?regionName=${region}&query=${inputValue}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setHouses(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [region, inputValue]);

  return (
    <div className="ListPage">
      <h1>ListPage</h1>
      <div>
        <select value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="">지역 선택</option>

          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
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
