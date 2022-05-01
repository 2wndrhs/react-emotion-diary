import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const diaryList = useContext(DiaryStateContext);
  const [originData, setOriginDate] = useState();

  // 첫 랜더링, id 값이 바뀔 때 페이지 타이틀 업데이트
  useEffect(() => {
    const titleElement = document.querySelector("title");
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`;
  }, [id]);

  // diaryList, id 값이 바뀔때마다 originData 값 업데이트
  useEffect(() => {
    if (diaryList.length) {
      const targetDiary = diaryList.find(
        (item) => parseInt(item.id) === parseInt(id)
      );
      if (targetDiary) {
        setOriginDate(targetDiary);
      } else {
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [diaryList, id]);

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
