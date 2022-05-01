// Date 객체를 받아 YYYY-MM-DD 형식 문자열로 변환
export const getStringDate = (date) => {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  return `${year}-${month}-${day}`;
};
