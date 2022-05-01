import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";
import MyButton from "./MyButton";
// 함수 스코프 밖에 선언한 변수는 한번만 선언된다.
const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  { value: "all", name: "전부다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "나쁜 감정만" },
];

const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((item, index) => (
        <option key={index} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  );
});

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList = () => {
    // 감정 점수 필터링을 위한 콜백 함수
    const filterCallBack = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };
    // 일기의 최신순, 오래된순 정렬을 위한 compare 콜백 함수
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    // diaryList의 깊은 복사
    const copyList = JSON.parse(JSON.stringify(diaryList));
    // copyList에 감정 점수 필터링 적용
    const filteredList =
      filter === "all"
        ? copyList
        : copyList.filter((item) => filterCallBack(item));
    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type="positive"
            text="새 일기 쓰기"
            onClick={() => navigate("/new")}
          />
        </div>
      </div>
      {getProcessedDiaryList().map((item) => (
        <DiaryItem key={item.id} {...item} />
      ))}
    </div>
  );
};

DiaryList.deafultProps = {
  diaryList: [],
};

export default DiaryList;
