import "./ListPage.css";

import logo from "../assets/logo.png";

import { regions as allRegions } from "../data/regions";

import Map from "../components/Map";
import DetailPanel from "../components/DetailPanel";

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import HouseCard from "../components/HouseCard";

import { Link } from "react-router-dom";

const ListPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("q") || "";
  const regionParam = searchParams.get("region") || "";

  const [regionsSelected, setRegionsSelected] = useState(
    regionParam ? regionParam.split(",") : [],
  );
  const [inputValue, setInputValue] = useState(query);

  const [isRegionOpen, setIsRegionOpen] = useState(false);

  const [houses, setHouses] = useState([]);

  const firstRow = allRegions.slice(0, 8);
  const secondRow = allRegions.slice(8, 16);

  const [selectedHouse, setSelectedHouse] = useState(null);

  useEffect(() => {
    setInputValue(query);
    if (query && regionParam) {
      fetchHouses(regionParam, query);
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
    if (regionsSelected.length === 0) return;

    const regionString = regionsSelected.join(",");

    navigate(
      `/list?q=${encodeURIComponent(inputValue)}&region=${encodeURIComponent(
        regionString,
      )}`,
    );

    fetchHouses(regionString, inputValue);
  };

  const handleRegionSearch = () => {
    if (!inputValue.trim()) return;
    if (regionsSelected.length === 0) return;

    const regionString = regionsSelected.join(",");

    navigate(
      `/list?q=${encodeURIComponent(inputValue)}&region=${encodeURIComponent(
        regionString,
      )}`,
    );

    fetchHouses(regionString, inputValue);

    setIsRegionOpen(false); // 창 닫기
  };

  useEffect(() => {
    console.log(selectedHouse);
  }, [selectedHouse]); // 임시

  return (
    <div className="ListPage">
      <div className="Header">
        <div className="Logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <h1>Bee N-ZIP</h1>
        </div>

        <button className="ContactBtn">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.7998 8.80005C12.7998 9.15367 12.6593 9.49281 12.4093 9.74286C12.1592 9.99291 11.8201 10.1334 11.4665 10.1334H3.46647L0.799805 12.8V2.13338C0.799805 1.77976 0.94028 1.44062 1.19033 1.19057C1.44038 0.940525 1.77952 0.800049 2.13314 0.800049H11.4665C11.8201 0.800049 12.1592 0.940525 12.4093 1.19057C12.6593 1.44062 12.7998 1.77976 12.7998 2.13338V8.80005Z"
              stroke="#F5F5F5"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          문의하기
        </button>
      </div>

      <div className="SearchMain">
        <div className="Left">
          <div className="ResultHeader">
            <h2>총 {houses.length}개의 추천 후보지를 찾았어요</h2>

            <div className="ResultDesc">
              <div className="ResultText">
                <p>
                  다양한 조건을 종합해 산출한 추천 점수를 기준으로 정렬했어요
                </p>

                <p className="LastLine">
                  리스트의 카드를 선택하면 상세 정보를 확인할 수 있어요
                  <span className="TooltipWrapper">
                    <span className="InfoBtn">?</span>

                    <span className="Tooltip">
                      주변 시세를 기반해 예상 가격을 산출했어요
                      <br />
                      실제 가격과 차이가 있을 수 있어요
                    </span>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="CardList">
            {houses.map((item) => (
              <HouseCard
                key={item.house.id}
                item={item}
                onClick={() =>
                  setSelectedHouse((prev) =>
                    prev?.house.id === item.house.id ? null : item,
                  )
                }
                isSelected={selectedHouse?.house.id === item.house.id}
              />
            ))}
          </div>
        </div>
        {selectedHouse && (
          <DetailPanel
            item={selectedHouse}
            onClose={() => setSelectedHouse(null)}
          />
        )}
        <div className="Right">
          <div className="MapSection">
            <Map houses={houses} selectedHouse={selectedHouse} />
          </div>
          <div className="Bottom">
            <div className="Region">
              <div className="RegionWrapper">
                <button
                  className="EditBtn"
                  onClick={() => {
                    if (isRegionOpen) {
                      handleRegionSearch(); // 열려있으면 검색 + 닫기
                    } else {
                      setIsRegionOpen(true); // 닫혀있으면 열기
                    }
                  }}
                >
                  지역 수정
                </button>
                {isRegionOpen && (
                  <div className="RegionSelect">
                    <button
                      className="RegionSearchBtn"
                      onClick={handleRegionSearch}
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.08333 12.9167V1.25M7.08333 1.25L1.25 7.08333M7.08333 1.25L12.9167 7.08333"
                          stroke="#F5F5F5"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <p>어떤 지역을 원하시나요?</p>

                    <div className="ListRegionRow">
                      {firstRow.map((r) => (
                        <button
                          key={r}
                          className={
                            r === "모두"
                              ? regionsSelected.length === allRegions.length - 1
                                ? "active"
                                : ""
                              : regionsSelected.includes(r)
                                ? "active"
                                : ""
                          }
                          onClick={() => {
                            if (r === "모두") {
                              if (
                                regionsSelected.length ===
                                allRegions.length - 1
                              ) {
                                setRegionsSelected([]);
                              } else {
                                setRegionsSelected(
                                  allRegions.filter((v) => v !== "모두"),
                                );
                              }
                              return;
                            }

                            setRegionsSelected((prev) =>
                              prev.includes(r)
                                ? prev.filter((v) => v !== r)
                                : [...prev, r],
                            );
                          }}
                        >
                          <>
                            {(r === "모두"
                              ? regionsSelected.length === allRegions.length - 1
                              : regionsSelected.includes(r)) && (
                              <span className="CheckIcon">✓</span>
                            )}

                            {r}
                          </>
                        </button>
                      ))}
                    </div>

                    <div className="ListRegionRow">
                      {secondRow.map((r) => (
                        <button
                          key={r}
                          className={
                            r === "모두"
                              ? regionsSelected.length === allRegions.length - 1
                                ? "active"
                                : ""
                              : regionsSelected.includes(r)
                                ? "active"
                                : ""
                          }
                          onClick={() => {
                            if (r === "모두") {
                              if (
                                regionsSelected.length ===
                                allRegions.length - 1
                              ) {
                                setRegionsSelected([]);
                              } else {
                                setRegionsSelected(
                                  allRegions.filter((v) => v !== "모두"),
                                );
                              }
                              return;
                            }

                            setRegionsSelected((prev) =>
                              prev.includes(r)
                                ? prev.filter((v) => v !== r)
                                : [...prev, r],
                            );
                          }}
                        >
                          <>
                            {(r === "모두"
                              ? regionsSelected.length === allRegions.length - 1
                              : regionsSelected.includes(r)) && (
                              <span className="CheckIcon">✓</span>
                            )}

                            {r}
                          </>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="regionSelect">
                <div className="RegionLabel">
                  <p>현재 선택된 지역이에요</p>
                  <div className="TooltipWrapper">
                    <span className="InfoBtn">?</span>

                    <div className="Tooltip">
                      지역을 변경하려면 <b>지역 수정 버튼</b>을 눌러주세요
                    </div>
                  </div>
                </div>
                <p>{regionsSelected.join(", ")}</p>
              </div>
            </div>

            <div className="Input">
              <textarea
                className="SearchInput"
                type="text"
                value={inputValue}
                maxLength={500}
                placeholder="20대 손님이 많이 오는 카페를 지을거야. 어떤 위치가 좋을까?"
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />

              <button onClick={handleSearch}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.83333 12.6667V1M6.83333 1L1 6.83333M6.83333 1L12.6667 6.83333"
                    stroke="#F5F5F5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="CharCount">
              <p>{inputValue.length}/500</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListPage;
