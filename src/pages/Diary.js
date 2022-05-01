import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DiaryStateContext } from "../App";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
// 유틸
import { getStringDate } from "../utils/date";
import { emotionList } from "../utils/emotion";

const Diary = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState();

  // 첫 랜더링, id 값이 바뀔 때 페이지 타이틀 업데이트
  useEffect(() => {
    const titleElement = document.querySelector("title");
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기`;
  }, [id]);

  // id나 diaryList 값이 바뀔 대마다 targetDiary 값을 업데이트
  useEffect(() => {
    if (diaryList.length) {
      const targetDiary = diaryList.find(
        (item) => parseInt(item.id) === parseInt(id)
      );
      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">로딩중입니다...</div>;
  } else {
    const curEmotionData = emotionList.find(
      (item) => parseInt(item.emotion_id) === parseInt(data.emotion)
    );

    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={<MyButton text="뒤로가기" onClick={() => navigate(-1)} />}
          rightChild={
            <MyButton
              text="수정하기"
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={[
                "diary_img_wrapper",
                `diary_img_wrapper_${data.emotion}`,
              ].join(" ")}
            >
              <img src={curEmotionData.emotion_img} alt="emotion" />
              <div className="emotion_descript">
                {curEmotionData.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
