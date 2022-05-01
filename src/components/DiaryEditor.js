import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { DiaryDispatchContext } from "../App";
// 컴포넌트
import EmotionItem from "./EmotionItem";
import MyButton from "./MyButton";
import MyHeader from "./MyHeader";
// 유틸
import { getStringDate } from "../utils/date";
import { emotionList } from "../utils/emotion";

const DiaryEditor = ({ isEdit, originData }) => {
  const navigate = useNavigate();

  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState("");
  const contentRef = useRef();

  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

  // 일기 수정 페이지일 경우 초기 데이터 세팅
  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  // content state가 업데이트 될 때마다 컴포넌트가 리랜더링 되어
  // 함수가 재생성 되는걸 방지하기 위해 useCallback 활용
  const handleClickEmotion = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  // 일기 내용 길이를 검사하고 생성 페이지인지, 수정 페이지인지 검사
  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }

    navigate("/", { replace: true });
  };

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={<MyButton text="< 뒤로가기" onClick={() => navigate(-1)} />}
        rightChild={
          isEdit && (
            <MyButton text="삭제하기" type="negative" onClick={handleRemove} />
          )
        }
      />
      <div>
        {/* 날짜 선택 섹션 */}
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              type="date"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </section>
        {/* 감정 점수 선택 섹션 */}
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((item) => (
              <EmotionItem
                key={item.emotion_id}
                {...item}
                onClick={handleClickEmotion}
                isSelected={item.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        {/* 일기 내용 작성 섹션 */}
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요?"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        {/* 컨트롤 버튼 섹션 */}
        <section>
          <div className="control_box">
            <MyButton text="취소하기" onClick={() => navigate(-1)} />
            <MyButton text="작성완료" type="positive" onClick={handleSubmit} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
