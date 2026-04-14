import "./SearchPage.css";

import logo from "../assets/logo.png";

import { regions } from "../data/regions";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SearchPage = () => {
  const [regionsSelected, setRegionsSelected] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) {
      alert("검색어를 입력하세요");
      return;
    }

    if (regionsSelected.length === 0) {
      alert("지역을 선택하세요");
      return;
    }

    navigate(
      `/list?q=${encodeURIComponent(query)}&region=${encodeURIComponent(
        regionsSelected.join(","),
      )}`,
    );
  };

  // 지역 리스트
  const firstRow = regions.slice(0, 8);
  const secondRow = regions.slice(8, 16);

  return (
    <div className="SearchPage">
      <div className="SearchContainer">
        <div className="Title">
          <div className="TitleRow1">
            <img src={logo} alt="logo" className="Logo" />
            <h1>Bee N-ZIP</h1>
          </div>
          <div className="TitleRow2">
            <p>조건을 연결해 </p>
            <p>최적의 공간을 찾다</p>
          </div>
        </div>

        {/* 지역 선택 */}
        <div className="RegionSelect">
          <p>어떤 지역을 원하시나요?</p>
          <div className="RegionRow">
            {firstRow.map((r) => (
              <button
                key={r}
                className={regionsSelected.includes(r) ? "active" : ""}
                onClick={() =>
                  setRegionsSelected((prev) =>
                    prev.includes(r)
                      ? prev.filter((v) => v !== r)
                      : [...prev, r],
                  )
                }
              >
                {r}
              </button>
            ))}
          </div>

          <div className="RegionRow">
            {secondRow.map((r) => (
              <button
                key={r}
                className={regionsSelected.includes(r) ? "active" : ""}
                onClick={() =>
                  setRegionsSelected((prev) =>
                    prev.includes(r)
                      ? prev.filter((v) => v !== r)
                      : [...prev, r],
                  )
                }
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* 목적 입력 */}
        <div className="PurposeSelect">
          <p>어떤 목적으로 공간을 이용하실 건가요?</p>
          <div className="Input">
            <input
              type="text"
              value={query}
              placeholder="20대 여자 손님이 많이 오는 카페를 지을거야. 어떤 위치가 좋을까?"
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <button onClick={handleSearch}>검색</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
