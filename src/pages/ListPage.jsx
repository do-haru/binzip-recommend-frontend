import "./ListPage.css";

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import HouseCard from "../components/HouseCard";

const ListPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("q") || "";

  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const handleSearch = () => {
    if (!inputValue.trim()) return;
    navigate(`/list?q=${inputValue}`);
  };

  const mockData = [
    {
      id: 1,
      location: "영주시 풍기읍",
      area: 85,
      reason: "유동인구가 많아 상업용에 적합",
    },
    {
      id: 2,
      location: "영주시 이산면",
      area: 120,
      reason: "조용한 환경으로 휴식에 적합",
    },
  ];

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
        {mockData.map((item) => (
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
