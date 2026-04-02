import "./SearchPage.css";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/list?q=${query}`);
  };

  return (
    <div className="SearchPage">
      <h1>Searchpage</h1>
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
