import "./SearchPage.css";

import { regions } from "../data/regions";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SearchPage = () => {
  const [region, setRegion] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) {
      alert("검색어를 입력하세요");
      return;
    }

    if (!region) {
      alert("지역을 선택하세요");
      return;
    }

    navigate(
      `/list?q=${encodeURIComponent(query)}&region=${encodeURIComponent(region)}`,
    );
  };

  return (
    <div className="SearchPage">
      <h1>Searchpage</h1>

      {/* 🔥 지역 선택 */}
      <select value={region} onChange={(e) => setRegion(e.target.value)}>
        <option value="">지역 선택</option>

        {regions.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      {/* 🔥 자연어 입력 */}
      <input
        type="text"
        placeholder="카페 만들기 좋은 빈집을 추천해줘"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
};

export default SearchPage;
