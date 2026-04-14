import "./ListPage.css";

import logo from "../assets/logo.png";

import Map from "../components/Map";

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
    if (query && regionParam) {
      fetchHouses(regionParam, query); // 🔥 추가
    }
  }, [query, regionParam]);

  const fetchHouses = (region, query) => {
    fetch(
      `http://localhost:8080/api/houses/test1?regionName=${region}&query=${query}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setHouses(data);
      })
      .catch(console.error);
  };

  const handleSearch = () => {
    if (!inputValue.trim()) return;
    if (!region) return;
    navigate(
      `/list?q=${encodeURIComponent(query)}&region=${encodeURIComponent(region)}`,
    );

    fetchHouses(region, inputValue);
  };

  return (
    <div className="ListPage">
      <div className="Header">
        <img src={logo} alt="logo" className="Logo" />
        <h1>Bee N-ZIP</h1>
      </div>

      <div className="SearchMain">
        <div className="Left">
          ddd
          {houses.map((item) => (
            <HouseCard
              key={item.id}
              item={item}
              onClick={() => navigate(`/detail/${item.id}`)}
            />
          ))}
        </div>

        <div className="Right">
          <div className="MapSection">
            <Map />
          </div>
          <div className="Bottom">하단 패널</div>
        </div>
      </div>
      {/*
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
       */}
    </div>
  );
};

export default ListPage;
