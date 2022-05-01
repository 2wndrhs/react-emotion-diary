import React, { useEffect } from "react";
import DiaryEditor from "../components/DiaryEditor";

const New = () => {
  // 첫 랜더링시 페이지 타이틀 업데이트
  useEffect(() => {
    const titleElement = document.querySelector("title");
    titleElement.innerHTML = `감정 일기장 - 새 일기`;
  }, []);

  return (
    <div>
      <DiaryEditor />
    </div>
  );
};

export default New;
